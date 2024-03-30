const express = require('express');
const verifyAuth = require('../middleware/verifyAuth');
const Institute = require('../models/Institute');
const Student = require('../models/Student');
// const Admin = require('../models/Admin');
const router = express.Router();

router.post('/verification-request', verifyAuth, async (req, res) => {
    try {
        const id = req.user.id;
        const institute = await Institute.findById(id)
        if (institute) {
            const unVerifiedStudents = await Student.find({ $and: [{ college: institute.AISHE }, { verified: false }] })
                .select('id name degree rollNo');
            res.send({ success: true, students: unVerifiedStudents })
        }

    } catch (error) {
        res.send({ success: false, error: 'Server Error' });
    }
})

router.post('/verify', verifyAuth, async (req, res) => {
    try {
        const id = req.user.id;
        const institute = await Institute.findById(id)
        if (institute) {

            if (req.body.action === 'accept') {
                await Student.findByIdAndUpdate(req.body._id, { $set: { ["verified"]: true } })
                res.send({ success: true, status: 'Verified' })
            } else {
                await Student.findByIdAndDelete(req.body._id)
                res.send({ success: true, status: 'Rejected' })
            }
        }
    } catch (error) {
        console.log(error.message)
        res.send({ success: false, error: 'Server Error' });
    }
})




router.post('/get-students', verifyAuth, async (req, res) => {
    try {
        const id = req.user.id;
        const institute = await Institute.findById(id).select('AISHE');
        if (institute) {
            const student = await Student.find({ AISHE: institute })
        }

    } catch (error) {
        res.send({ success: false, error: 'Server Error' });
    }
})

module.exports = router