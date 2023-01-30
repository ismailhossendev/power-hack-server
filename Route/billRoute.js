const express = require('express');
const { getBillList, addBilling, deleteBIll, updateBill } = require('../Controller/billController');
const { registerUser, loginUser } = require('../Controller/userControll');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();


router.get('/billing-list', checkAuth, getBillList);
router.post('/add-billing', checkAuth, addBilling);
router.delete('/delete-billing/:id', checkAuth, deleteBIll);
router.patch('/update-billing/:id', checkAuth, updateBill)


router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;