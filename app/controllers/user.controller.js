const User = require('../models/user.model.js');
const SessionController = require('./session.controller.js');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error registering new user please try again."
            });
        });
};

exports.logout = (req, res) => {
    if (req.cookies.sid) {
        SessionController.delete(req.cookies.sid)
            .then(sid => {
                res.clearCookie('sid');
                res.send('Session removed successfully.')
            })
            .catch(err => {
                res.status(500).send('Error removing session.');
            });
    } else {
        res.status(500).send('Not authorized.');
    }
};

exports.authMiddleware = (req, res, next) => {
    if (req.cookies.sid) {
        SessionController.getUsername(req.cookies.sid)
            .then(username => {
                console.log(username);
                req.username = username;
                next();
            })
            .catch(err => {
                next();
            });
    } else {
        next();
    }
};

exports.authWrapper = (next) => {
    return (req, res) => {
        console.log('checking');
        if (req.username) {
            next(req, res);
        } else {
            res.status(401).send('You need to authorize to perform this action.');
        }
    }
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then(user => {

            if (bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    res.status(500).send('Error comparing passwords.');
                } else if (result) {
                    SessionController.create(username)
                        .then(createdSessionId => {
                            res.cookie('sid', createdSessionId, {httpOnly: false});
                            res.send(createdSessionId);
                        })
                        .catch(err => {
                            res.status(500).send('Cannot create session.');
                        });
                } else {
                    res.status(500).send('Passwords do not match.');
                }
            }));
        })
        .catch(err => {
            res.status(500).send('User not found');
        });
};

exports.getUsername = (req, res) => {
    const username = req.username;
    res.send({username});
};

exports.my = (req, res) => {
    if (req.cookies.sid) {
        SessionController.getUser(req.cookies.sid)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                res.status(500).send('User error.');
            });
    }
};

exports.edit = (req, res) => {
    if (req.cookies.sid) {
        SessionController.getUser(req.cookies.sid)
            .then(user => {
                let tempData = {};
                if (req.body.goal) {
                    const tempGoal = parseInt(req.body.goal);
                    if (tempGoal > 0 && tempGoal < 10000) {
                        tempData.goal = tempGoal
                    } else {
                        return res.status(400).send({
                            message: "Total number of calories must be at range [1, 9999]"
                        });
                    }
                }
                if (req.body.weight) {
                    const tempWeight = parseInt(req.body.weight);
                    if (tempWeight > 0 && tempWeight < 200) {
                        tempData.weight = tempWeight;
                    } else {
                        return res.status(400).send({
                            message: "Weight must be at range [1, 199]"
                        });
                    }
                }
                if (req.body.height) {
                    const tempHeight = parseInt(req.body.height);
                    if (tempHeight > 0 && tempHeight < 300) {
                        tempData.height = tempHeight;
                    } else {
                        return res.status(400).send({
                            message: "Height must be at range [1, 299]"
                        });
                    }
                }
                User.findByIdAndUpdate(user._id, tempData).then(user => {
                    res.send(user);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "User not found"
                        });
                    }
                    console.log(err);
                    return res.status(500).send({
                        message: "Error updating user"
                    });
                });
            })
            .catch(err => {
                res.status(500).send('User error.');
            });
    }
};