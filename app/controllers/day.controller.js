const Day = require('../models/day.model.js');

exports.create = (req, res) => {
    if (!req.body.date) {
        return res.status(400).send({
            message: "DAte of day cannot be empty."
        });
    }
    
    // Create a Day
    const day = new Day({
        date: req.body.date,
        total_calories: req.body.total_calories,
        comment: req.body.comment
    });

    // Save Day in the database
    day.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Day."
            });
        });
};

exports.findOne = (req, res) => {
    Day.findOne({date: req.params.date})
        .then(day => {
            if (!day) {
                return res.status(404).send({
                    message: "Day not found with date " + req.params.date
                });
            }
            res.send(day);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Day not found with date " + req.params.date
                });
            }
            return res.status(500).send({
                message: "Error retrieving day"
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.date) {
        return res.status(400).send({
            message: "Date can not be empty"
        });
    }

    Day.findOne({date: req.params.date})
        .then(day => {
            if (!day) {
                return res.status(404).send({
                    message: "Day not found with id " + req.params.dayId
                });
            } else {
                if (req.body.comment) {
                    day.comment = req.body.comment;
                }
                if (!req.body.total_calories || parseInt(req.body.total_calories) < 0 || parseInt(req.body.total_calories) > 10000) {
                    return res.status(404).send({
                        message: "Total number of calories must be at range [0, 10000]"
                    });
                } else {
                    day.total_calories = parseInt(req.body.total_calories);
                }
                day.save()
                    .then(data => {
                        res.send(data);
                    }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while saving the Day."
                    });
                });

            }
            res.send(day);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Day not found with date"
                });
            }
            return res.status(500).send({
                message: "Error updating day"
            });
        });
};

