const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectsSchema = new Schema({
    owner:{
        type: mongoose.Schema.ObjectId,
        ref: 'student'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    synopsisFirst: {
        type: String,
        required: true
    },
    synopsisSecond: {
        type: String,
        required: true
    },
    synopsisThird: {
        type: String,
        required: true
    },
    synopsisFourth: {
        type: String,
        required: true
    },
    linkFirstTitle: {
        type: String
    },
    linkFirst: {
        type: String
    },
    linkSecondTitle: {
        type: String
    },
    linkSecond: {
        type: String
    },
    linkThirdTitle: {
        type: String
    },
    linkThird: {
        type: String
    },
    referenceFirst: {
        type: String
    },
    referenceSecond: {
        type: String
    },
    referenceThird: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('projects',ProjectsSchema);

