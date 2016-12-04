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
            .catch((err) => {
                console.error(err);
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    /*  Comment */

    app.get('/comments', (req, res) => {
        req.checkQuery('thread_id').notEmpty().isInt();
        let thread_id = req.query.thread_id;

        if (thread_id != null) {
            let promise = req.getValidationResult()
                .then((validation) => (ConditionalPromise(validation.isEmpty())))
                .then(() => (Models.Comment.getAllByThreadId(thread_id)))
                .then((comments) => {
                    res.json(comments.map(comment => comment.json()));
                })
                .catch((err) => {
                    console.error(err)
                    res.status(400);
                    res.json({error: {reason: 'Bad request.'}});
                });
            return;
        }

    });
    app.get('/comment', (req, res) => {
        req.checkQuery('comment_id').notEmpty();
        let comment_id = parseInt(req.query.comment_id);

        if (comment_id != null) {
            let promise = req.getValidationResult()
                .then((validation) => (ConditionalPromise(validation.isEmpty())))
                .then(() => (Models.Comment.getById(comment_id)))
                .then((comments) => {
                    res.json(comments);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(400);
                    res.json({error: {reason: 'Bad request.'}});
                });
            return;

        }
    });

    app.post('/comment', (req, res) => {
        req.checkBody('thread_id').notEmpty().isInt();
        req.checkBody('content').notEmpty();
        req.checkBody('is_anon').notEmpty();

        //answer_id is optional
        let answer_id = (Object.keys(req.body).includes("answer_id")) ? parseInt(req.body.answer_id) : null;
        let created_by = parseInt(req.session.account_id);

        let comment = {
            thread_id: parseInt(req.body.thread_id),
            answer_id: answer_id,
            content: req.body.content,
            is_anon: req.body.is_anon,
        };


        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Comment.post(comment, created_by)))
            .then((comments) => {
                res.json(comments);
            })
            .catch((err) => {
                console.error(err);
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
        return;

    });


    app.delete('/comment/:id', (req, res) => {
        req.checkParams('id').notEmpty().isInt();
        let comment_id = parseInt(req.params.id);
        let account_id = parseInt(req.session.account_id);

        if (comment_id != null) {
            let promise = req.getValidationResult()
                .then((validation) => (ConditionalPromise(validation.isEmpty())))
                .then(() => (Models.Comment.delete(comment_id, account_id)))
                .then((comments) => {
                    res.json({status: 200});
                })
                .catch((err) => {
                    console.error(err);
                    res.status(400);
                    res.json({error: {reason: 'Bad request.'}});
                });
            return;

        }
    });
};

module.exports = Controller;
