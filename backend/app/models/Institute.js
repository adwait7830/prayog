const mongoose = require('mongoose');
const { Schema } = mongoose;

const InstituteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    AISHE: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: 'General'
    },
    workshops: {
        type: Number,
        default: 0
    },
    students:{
        type: Number,
        default: 0
    },
    verified: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('institutes', InstituteSchema);