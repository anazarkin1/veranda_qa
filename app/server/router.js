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
        res.render('index');
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

    app.get('/dashboard(/([0-9]+))?', MW.authentication, (req, res, next) => {
        // 3 Types of Dashboards

        if (req.params[1].length === 0) {
            if (req.session.is_instructor) {
                res.render('/instructor_dashboard');
            } else if (req.session.is_student) {
                res.render('/student_dashboard');
            } else {
                console.log("Neither instructor nor student!");
                next();
            }
        } else {
            Models.Course.get(req.params[1]).then(course => {
                course.hasAccount(req.session.account_id).then(() => {
                    res.render('/course_dashboard', course);
                }).catch(() => {
                    // Invalid permissions.
                    res.redirect('/error');
                });
            }).catch(() => {
                // Invalid course id.
                res.redirect('/error');
            });
        }
    });
};

module.exports = Router;
