const day = require('../controllers/day.controller.js');
const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    const meals = require('../controllers/meal.controller.js');
    app.post('/api/days', user.authWrapper(day.create));
    app.get('/api/days/:date', user.authWrapper(day.findOne));
    app.post('/api/days/:date', user.authWrapper(day.update));
};