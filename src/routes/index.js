const person = require('./person.route');
const routes = (app) => {
    app.use('/api/person', person);
};
module.exports = routes;
