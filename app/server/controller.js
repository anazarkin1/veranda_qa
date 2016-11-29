/* Routes */

var bcrypt = require('bcryptjs');
var constants = require('./constants');

var ConditionalPromise = require('./promise-helpers').ConditionalPromise;

var Controller = (app, dao) => {
    // Models
    var Models = require('./models')(dao);

    // Controller MiddleWare
    var MW = {
        authentication: (req, res, next) => {
            if (req.session.authenticated) {
                return next();
            }

            res.status(401);
            res.json({ error: { code: 401, reason: 'Must be logged in.' } });
        }
    };

    /* Login */
    app.post('/login', (req, res) => {
        req.checkBody('email', 'Email address required.').notEmpty().isEmail();
        req.checkBody('password').notEmpty();

        let account;

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Account.getByEmail(req.body.email)))
            .then((_account) => {
                account = _account;
                // Successfully logged in!
                return ConditionalPromise(account.password && bcrypt.compareSync(req.body.password, account.password));
            })
            .then(() => {
                req.session.account_id = account.id;
                req.session.name = account.name;
                req.session.authenticated = true;
                res.json({ status: 200 });
            })
            .catch(() => {
                res.status(401);
                res.json({ error: { reason: 'Invalid email/password.' } });
            });
    });

    /* Account Signup */
    app.post('/account', (req, res) => {
        // var hashed_password = bcrypt.hashSync(raw_password, 10);
    });

};

module.exports = Controller;
