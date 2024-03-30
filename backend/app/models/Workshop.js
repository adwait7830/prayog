const mongoose = require('mongoose');
const { Schema } = mongoose;

const WorkshopsSchema = new Schema({
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'institute'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('workshops', WorkshopsSchema);

