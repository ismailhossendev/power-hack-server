const user = require('../Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    try {
        if (req.body.password.length < 6) throw new Error('Password must be at least 6 characters long');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt)


        const isExist = await user.findOne({ email: req.body.email });
        if (isExist) throw new Error('Email already exists');


        const userData = new user({
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await userData.save();
        if (savedUser) {
            const token = jwt.sign({ id: savedUser._id, email: req.body.email }, process.env.JWT_HEX, { expiresIn: '1h' });
            res.status(201).json({ message: 'User created successfully', token: token, id: savedUser._id });
        }
    } catch (err) {
        res.status(409).json({ message: err.message.slice(err.message.indexOf(': ') + 2) });
    }
}

const loginUser = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;

        const isExist = await user.findOne({ email: email });
        if (!isExist) throw new Error('Invalid email or password');
        const isMatch = await bcrypt.compareSync(password, isExist.password);
        if (!isMatch) throw new Error('Invalid email or password');
        const token = jwt.sign({ id: isExist._id, email }, process.env.JWT_HEX, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token: token });
    }
    catch (err) {
        res.status(409).json({ message: err.message.slice(err.message.indexOf(': ') + 2) });
    }
};


module.exports = {
    registerUser,
    loginUser,
};