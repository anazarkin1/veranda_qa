/* Routes */
var constants = require('./constants');

module.exports = function(app) {

    app.get('/', (req, res) => {
        res.render('index');
    });

    if (constants.DEBUG) {
        app.get('/debug/*', (req, res) => {
            res.render(req.params[0]);
        });
    }

};
