const mongoose = require('mongoose');
const _ = require('lodash');

const DaySchema = mongoose.Schema({
    date: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    total_calories: {type: Number},
    comment: { type: String },
    }, {
    timestamps: true
});

module.exports = mongoose.model('Day', DaySchema);