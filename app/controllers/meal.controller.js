const Meal = require('../models/meal.model.js');

exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name of meal cannot be empty."
        });
    }
    if (!req.body.calories) {
        return res.status(400).send({
            message: "Calories of meal cannot be empty."
        });
    }

    // Create a Meal
    const meal = new Meal({
        name: req.body.name,
        calories: req.body.calories,
        description: req.body.description
    });

    // Save Meal in the database
    meal.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Meal."
            });
        });
};

exports.findAll = (req, res) => {
    Meal.find()
        .then(meals => {
            res.send(meals);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving meals."
            });
        });
};

exports.findOne = (req, res) => {
    Meal.findById(req.params.mealId)
        .then(meal => {
            if (!meal) {
                return res.status(404).send({
                    message: "Meal not found with id " + req.params.mealId
                });
            }
            res.send(meal);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Meal not found with id " + req.params.mealId
                });
            }
            return res.status(500).send({
                message: "Error retrieving meal with id " + req.params.mealId
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Meal content can not be empty"
        });
    }
    if (!req.body.calories) {
        return res.status(400).send({
            message: "Meal content can not be empty"
        });
    }

    // Find meal and update it with the request body
    Meal.findByIdAndUpdate(req.params.mealId, {
        name: req.body.name,
        calories: req.body.calories,
        description: req.body.description
    })
        .then(meal => {
            if (!meal) {
                return res.status(404).send({
                    message: "Meal not found with id " + req.params.mealId
                });
            }
            res.send(meal);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Meal not found with id " + req.params.mealId
                });
            }
            return res.status(500).send({
                message: "Error updating meal with id " + req.params.mealId
            });
        });
};

exports.delete = (req, res) => {
    Meal.findByIdAndRemove(req.params.mealId)
        .then(meal => {
            if (!meal) {
                return res.status(404).send({
                    message: "Meal not found with id " + req.params.mealId
                });
            }
            res.send({ message: "Meal deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Meal not found with id " + req.params.mealId
                });
            }
            return res.status(500).send({
                message: "Could not delete meal with id " + req.params.mealId
            });
        });
};

exports.deleteAll = (req, res) => {
    Meal.remove({})
        .then(meal => {
            res.send({ message: "Meals deleted successfullly." });
        }).catch(err => {
            return res.status(500).send({
                message: "Couldn't delete meals."
            });
        });
};
