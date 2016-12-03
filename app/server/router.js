/* Routes */

var constants = require('./constants');

var Router = (app, dao) => {
    // Models
    var Models = require('./models')(dao);

    // Router MiddleWare
    var MW = {
        authentication: (req, res, next) => {
            if (req.session.authenticated) {
                return next();
            }

            // Remember which page the user wanted to access.
            req.session.login_to = req.url;
            res.redirect('/login');
        }
    };

    app.get('/', (req, res) => {
        if (req.session.authenticated) {
            res.redirect('/dashboard');
        } else {
            res.render('index');
        }
    });

    if (constants.DEBUG) {
        app.get('/debug/*', (req, res) => {
            res.render(req.params[0]);
        });
    }

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/logout', (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    });

    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.get('/dashboard', MW.authentication, (req, res, next) => {
        // Pick a default course and show it.
        Models.Course.getDefault(req.session.account_id).then((course) => {
            res.redirect('/dashboard/' + course.course_id);
        }).catch(() => {
            // TODO: No course yet! Go to course setup page.
            next();
        });
    });

    app.get('/dashboard/:course_id', MW.authentication, (req, res, next) => {
        Models.Course.get(req.params.course_id).then(course => {
            course.hasAccount(req.session.account_id).then(() => {
                res.render('course_dashboard', course);
            }).catch(() => {
                // Invalid permissions.
                res.redirect('/error');
            });
        }).catch(() => {
            // Invalid course id.
            res.redirect('/error');
        });
    });
};

module.exports = Router;
