const Day = require('../models/day.model.js');
const SessionController = require('./session.controller.js');

exports.create = (req, res) => {
    if (!req.body.date) {
        return res.status(400).send({
            message: "Date of day cannot be empty."
        });
    }

    const tempTotalCalories = parseInt(req.body.total_calories);
    if (!(tempTotalCalories > 0 && tempTotalCalories < 10000)) {
        return res.status(400).send({
            message: "Total number of calories per day must be at range [0, 9999]"
        });
    }

    // Save Day in the database
    SessionController.getUsername(req.cookies.sid)
        .then(username => {
            // Create a Day
            const day = new Day({
                date: req.body.date,
                total_calories: tempTotalCalories,
                comment: req.body.comment,
                username: username
            });

            day.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Day."
                });
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Day."
            });
        });
};

exports.findOne = (req, res) => {
    SessionController.getUsername(req.cookies.sid)
        .then(username => {
            Day.findOne({date: req.params.date, username: username })
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
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving day"
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

    const tempTotalCalories = parseInt(req.body.total_calories);
    if (!(tempTotalCalories > 0 && tempTotalCalories < 10000)) {
        return res.status(400).send({
            message: "Total number of calories per day must be at range [0, 9999]"
        });
    }

    SessionController.getUsername(req.cookies.sid)
        .then(username => {
            Day.findOne({date: req.params.date, username: username})
                .then(day => {
                    if (!day) {
                        return res.status(404).send({
                            message: "Day not found with date " + req.params.date
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
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Error retrieving day"
        });
    });

};

