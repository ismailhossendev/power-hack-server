const { findByIdAndDelete } = require('../Model/bill');
const bill = require('../Model/bill');



const getBillList = async (req, res) => {
    const search = req.query.search;
    const limit = parseInt(req.query.limit) || 10;
    const currentPage = parseInt(req.query.page);
    if (search) {

        const searchByName = await bill.find({
            name: { $regex: search, $options: 'i' },

        }).sort({ _id: -1 }).limit(limit).skip(limit * currentPage);
        const nameCount = await bill.find({
            name: { $regex: search, $options: 'i' },
        }).count();

        const searchByEmail = await bill.find({
            email: { $regex: search, $options: 'i' },
        }).sort({ _id: -1 }).limit(limit).skip(limit * currentPage);
        const emailCount = await bill.find({
            email: { $regex: search, $options: 'i' },
        }).count();


        const searchByPhone = await bill.find({
            phone: { $regex: search, $options: 'i' },
        }).sort({ _id: -1 }).limit(limit).skip(limit * currentPage);
        const phoneCount = await bill.find({
            phone: { $regex: search, $options: 'i' },
        }).count();

        if (searchByName.length > 0) {
            return res.json({ data: searchByName, count: nameCount });
        } else if (searchByEmail.length > 0) {
            return res.json({ data: searchByEmail, count: emailCount });
        } else if (searchByPhone.length > 0) {
            return res.json({ data: searchByPhone, count: phoneCount });
        } else {
            return res.json({ data: [], count: 0 });
        }
    };

    try {
        const count = await bill.find().count();
        const bills = await bill.find().sort({ _id: -1 }).limit(limit).skip(limit * currentPage);
        res.json({ data: bills, count });
    } catch (err) {
        res.json({ message: err });
    }
};



const addBilling = async (req, res) => {
    const billData = new bill({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        payableAmount: req.body.payableAmount,
    });
    try {
        const savedBill = await billData.save();
        res.json({
            success: true,
            message: 'Bill added successfully',
        });
    } catch (err) {
        res.status(409).json({ success: false, message: err.message.slice(err.message.indexOf(': ') + 2) });
    }
};



const deleteBIll = async (req, res) => {
    const deleteID = req.params.id
    console.log(deleteID);
    try {
        const del = await bill.findByIdAndDelete(deleteID)
        res.json({ success: true, message: 'Bill deleted successfully' })
    }
    catch (err) {

    }
}

const updateBill = async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
        const updates = await bill.findByIdAndUpdate(id, updateData);
        res.json({ success: true, message: 'Bill updated successfully' })
    }
    catch (err) {
        res.json({ success: false, message: err.message.slice(err.message.indexOf(': ') + 2) })
    }
}

module.exports = {
    getBillList,
    addBilling,
    deleteBIll,
    updateBill
};