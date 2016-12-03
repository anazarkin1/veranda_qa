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
            res.json({error: {code: 401, reason: 'Must be logged in.'}});
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
                res.json({status: 200});
            })
            .catch(() => {
                res.status(401);
                res.json({error: {reason: 'Invalid email/password.'}});
            });
    });

    /* Account Signup */
    app.post('/account', (req, res) => {
        // var hashed_password = bcrypt.hashSync(raw_password, 10);
    });

    /* Answer */
    app.post('/answer', (req, res) => {
        req.checkBody('thread_id').notEmpty();
        req.checkBody('content').notEmpty();
        req.checkBody('is_anon').notEmpty();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Answer.post(req.body, req.session.account_id)))
            .then((answer) => {
                res.json(answer.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.get('/answers', (req, res) => {
        req.checkQuery('thread_id').notEmpty();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Answer.getByThread(req.query.thread_id, req.session.account_id)))
            .then((answers) => {
                res.json(answers.map(answer => answer.json()));
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

};

module.exports = Controller;
