const express = require('express');
const verifyAuth = require('../middleware/verifyAuth');
const Admin = require('../models/Admin');
const router = express.Router();

router.post('/add-institute',verifyAuth,async (req,res)=>{
    try {
        const id = req.user.id;
        const admin = await Admin.findById(id);
        if (admin) {
            
        }
        
    } catch (error) {
        res.status(400).send({ success: false, error: 'Server Error' });
    }
})

module.exports = router

