const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const user = require('./app/controllers/user.controller.js');
const Meal = require('./app/models/meal.model.js');
const User = require('./app/models/user.model.js');
const _ = require('lodash');

const isOnHeroku = process.env.NODE && ~process.env.NODE.indexOf("heroku");

// create express app
const app = express();

const path = require('path')
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

app.use(user.authMiddleware);

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/api/testroute', (req, res) => {
    res.cookie('test', 'testval');
    res.json({ "message": "Welcome to Tasks application." });
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/meal.routes.js')(app);

if (isOnHeroku) {
    // Anything that doesn't match the above, send back index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}

app.set('port', (process.env.PORT || 5000));


// init data
User.countDocuments({}, function(err, count) {
    if (count === 0) {
        const userArray = [
            new User({ username: 'root', password: 'qwerty' })
        ];
        _.forEach(userArray, function(value) {
            value.save();
        });

        const mealArray = [
            new Meal({ name: 'Творог', calories: 159, description: 'Творог — популярный кисломолочный продукт, который производится в процессе сквашивания молока и дальнейшего отделения сыворотки.'}),
            new Meal({ name: 'Мясо курицы', calories: 119, description: 'Низкая калорийность курицы позволяет включать продукт в диеты для нормализации веса.'}),
        ];

        _.forEach(mealArray, function(value) {
            value.save();
        });
    }
});

// listen for requests
app.listen(app.get('port'), () => {
    console.log(`App is running on port ${app.get('port')}`);
});