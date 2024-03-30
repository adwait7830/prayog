const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Institute = require('../models/Institute');
const Admin = require('../models/Admin');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyAuth = require('../middleware/verifyAuth');
const Project = require('../models/Project');

//Register API
router.post('/student/register', [
    body('name', 'Invalid Name').notEmpty(),
    body('email', 'Invalid Email').notEmpty().isEmail(),
    body('password', 'Invalid Password').notEmpty().isAlphanumeric().isLength({ min: 8 }),
], async (req, res) => {
    const error = validationResult(req);
    console.log('registration initiated');
    if (!error.isEmpty()) {
        res.status(400).send({ success: false, error: error.errors[0].msg });
        return;
    }
    try { 
        const student = await Student.findOne({ email: req.body.email });
        if (student) {
            res.status(400).send({ success: false, error: 'Email Already Exists' });
            return;
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await Student.create({
            name: req.body.name,
            rollNo: req.body.rollNo,
            password: hashedPass,
            email: req.body.email,
            college: req.body.AISHE,
            degree: req.body.degree,
        })
        if (user) {
            res.json({ success: true });
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, error: 'Server Error' });
    }
})

router.post('/institute/register', [
    body('name', 'Invalid Name').notEmpty(),
    body('email', 'Invalid Email').notEmpty().isEmail(),
    body('password', 'Invalid Password').notEmpty().isAlphanumeric().isLength({ min: 8 }),
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({ success: false, error: "Invalid Field Entry" });
        return;
    }
    try {
        const institute = await Institute.findOne({ $or: [{ AISHE: req.body.AISHE }, { email: req.body.email }] });
        if (institute) {
            res.status(400).send({ success: false, error: 'Email or AISHE code already associated' });
            return;
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        const user = await Institute.create({
            name: req.body.name,
            password: hashedPass,
            email: req.body.email,
            AISHE: req.body.AISHE,
        })
        if (user) {
            res.json({ success: true });
        }

    } catch (error) {
        res.status(400).send({ success: false, error: 'Server Error' });
    }
})

//Login API
router.post('/login', [
    body('userID', 'Invalid Email').notEmpty(),
    body('password', 'Invalid Password').notEmpty()
], async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.send({ success: false, error: 'Invalid Field Entry' });
        return;
    }
    try {
        const student = await Student.findOne({ email: req.body.userID });
        if (student) {
            if (await bcrypt.compare(req.body.password, student.password)) {
                if (!student.verified) {
                    res.send({ success: false, error: 'Account not verified yet\n Contact your college' });
                    return;
                }
                const JWT_SIGN = process.env.JWT_SECRET;
                const authToken = jwt.sign({ user: { id: student.id } }, JWT_SIGN);
                res.json({ success: true, token: authToken, type: 'student' });
                return;
            } else {
                res.send({ success: false, error: 'Password does not match' });
                return;
            }
        }
        const institute = await Institute.findOne({ AISHE: req.body.userID });
        if (institute) {
            if (await bcrypt.compare(req.body.password, institute.password)) {
                if (!institute.verified) {
                    res.send({ success: false, error: 'Account not verified yet\n Contact Prayog Support' });
                    return;
                }
                const JWT_SIGN = process.env.JWT_SECRET;
                const authToken = jwt.sign({ user: { id: institute.id } }, JWT_SIGN);
                res.json({ success: true, token: authToken, type: 'institute' });
                return;
            } else {
                res.send({ success: false, error: 'Password does not match' });
                return;
            }
        }

        res.send({ success: false, error: 'Account Does Not Exists' });
    } catch (error) {
        res.json({ success: false, error: "Server Error" });
    }
})


router.post('/get-details', verifyAuth, async (req, res) => {
    try {
        const id = req.user.id;
        const student = await Student.findById(id).select("-password");
        if (student) {
            res.send({ validated: true, success: true, details: student, type: 'student' })
            return;
        }
        const institute = await Institute.findById(id).select("-password");
        if (institute) {
            const students = await Student.find({college:institute.AISHE})
            const projects = await Project.find({college:institute.AISHE})
            const details = institute.toObject();
            details.projects = projects.length;
            details.students = students.length;
            res.send({ validated: true, success: true, details, type: 'institute' })
            return;
        }

    } catch (error) {
        console.log(error.message)
        res.status(400).send({ success: false, error: 'Server Error' });
    }
})

router.post('/admin', async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            res.send({ success: false, error: 'Account Does Not Exists' });
            return;
        }

        if (await bcrypt.compare(req.body.password, admin.password)) {
            const JWT_SIGN = process.env.JWT_SECRET;
            const authToken = jwt.sign({ user: { id: admin.id } }, JWT_SIGN);
            res.json({ success: true, token: authToken });
            return;
        } else {
            res.send({ success: false, error: 'Password does not match' });
            return;
        }

    } catch {
        res.status(400).send({ success: false, error: 'Server Error' });
    }
})

router.post('/create-admin', async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const admin = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
    })

    res.json(admin);
})

router.post('/get-admin', verifyAuth, async (req, res) => {
    try {
        const id = req.user.id;
        const admin = await Admin.findById(id).select("-password");
        if (!admin) {
            res.send({ validated: false, success: false, error: "No Associated Account" })
            return;
        }
        res.send({ validated: true, success: true, details: admin })
        return;
    } catch (error) {
        res.status(400).send({ validated: false, success: false, error: 'Server Error' });
    }
})


module.exports = router