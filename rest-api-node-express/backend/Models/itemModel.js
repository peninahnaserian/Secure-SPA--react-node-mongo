const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    dateAdded:{
        type: Date,
        required: false
    }
});

module.exports = mongoose.model('Item',itemSchema);