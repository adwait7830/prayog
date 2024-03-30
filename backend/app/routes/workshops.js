const express = require('express');
const verifyAuth = require('../middleware/verifyAuth');
const Institute = require('../models/Institute');
const Workshop = require('../models/Workshop');
const { body, validationResult } = require('express-validator');
const router = express.Router();

router.post('/get-latest', verifyAuth, async (req, res) => {
    const id = req.user.id;
    const institute = await Institute.findById(id);
    if (institute) {
        const workshops = await Workshop.find({ owner: id }).sort({ date: -1 }).limit(5);
        res.send({ success: true, workshops })
    }
})

router.post('/institute/get-all',verifyAuth, async (req, res) => {
    const id = req.user.id;
    const institute = await Institute.findById(id);
    if (institute) {
        const workshops = await Workshop.find({ owner: id });
        res.send({ success: true, workshops })
    }
})

router.post('/add', [
    body('title', 'Invalid Title').notEmpty(),
    body('description', 'Invalid Description').notEmpty(),
    body('cover', 'Invalid Cover').notEmpty(),
    body('link', 'Invalid link').notEmpty(),
], verifyAuth, async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(400).send({ success: false, error: "Invalid Field Entry" });
        return;
    }
    const id = req.user.id;
    const institute = await Institute.findById(id);
    if (institute) {
        const { title, description, cover, link } = req.body;
        await Workshop.create({
            owner:institute._id,
            title: title,
            description: description,
            cover: cover,
            link: link
        })
        res.send({ success: true })
    }
})

module.exports = router