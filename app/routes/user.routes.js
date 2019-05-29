
module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/api/register', user.register);
    app.post('/api/login', user.login);
    app.post('/api/logout', user.logout);
    app.post('/api/edit', user.edit);
    app.get('/api/username', user.authWrapper(user.getUsername));
    app.get('/api/my', user.my);
}