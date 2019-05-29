const mongoose = require('mongoose');
const _ = require('lodash');

const MealSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    calories: {type: Number, required: true },
    description: { type: String }
    }, {
    timestamps: true
});

module.exports = mongoose.model('Meal', MealSchema);