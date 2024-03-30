const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        default: 'General'
    },    
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('admin',AdminSchema);