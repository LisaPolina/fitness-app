const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    const meals = require('../controllers/meal.controller.js');

    app.post('/api/meals', user.authWrapper(meals.create));
    app.get('/api/meals', meals.findAll);
    app.get('/api/meals/:mealId', user.authWrapper(meals.findOne));
    app.post('/api/meals/:mealId', user.authWrapper(meals.update));
    app.delete('/api/meals/:mealId', user.authWrapper(meals.delete));
    app.delete('/api/meals', user.authWrapper(meals.deleteAll));
}