const mongoose = require('mongoose');
const _ = require('lodash');

const DaySchema = mongoose.Schema({
    date: { type: String, required: true},
    username: { type: String, required: true },
    total_calories: {type: Number},
    comment: { type: String },
    }, {
    timestamps: true
});

DaySchema.index({ date: 1, username: 1}, { unique: true });

module.exports = mongoose.model('Day', DaySchema);