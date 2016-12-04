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
        req.checkBody('email', 'Email address required.').notEmpty().isEmail();
        req.checkBody('password').notEmpty();
        req.checkBody('name', 'Name required.').notEmpty();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Account.post(req.body)))
            .then(() => {
                res.json({status: 200});
            })
            .catch(() => {
                res.status(401);
                res.json({error: {reason: 'Email already exists.'}});
            });
    });

    /* Answer */
    app.post('/answer', (req, res) => {
        req.checkBody('thread_id').notEmpty().isInt();
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

    app.get('/answer', (req, res) => {
        req.checkQuery('answer_id').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Answer.get(req.query.answer_id, req.session.account_id)))
            .then((answer) => {
                res.json(answer.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.delete('/answer/:id', (req, res) => {
        req.checkParams('id').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Answer.delete(req.params.id, req.session.account_id)))
            .then((answer_id) => {
                res.json({status: 200});
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.get('/answers', (req, res) => {
        req.checkQuery('thread_id').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Answer.getByThread(req.query.thread_id, req.session.account_id)))
            .then((answers) => {
                let mappedAnswers = answers.map(answer => answer.json());
                res.json({
                    thread_id: req.query.thread_id,
                    count: mappedAnswers.length,
                    answers: mappedAnswers
                });
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    /* Thread */
    app.post('/thread', (req, res) => {
        req.checkBody('course_id').notEmpty().isInt();
        req.checkBody('content').notEmpty();
        req.checkBody('is_anon').notEmpty();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Thread.post(req.body, req.session.account_id)))
            .then((thread) => {
                res.json(thread.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.get('/thread', (req, res) => {
        req.checkQuery('thread_id').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Thread.get(req.query.thread_id, req.session.account_id)))
            .then((thread) => {
                res.json(thread.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.delete('/thread/:id', (req, res) => {
        req.checkParams('id').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Thread.delete(req.params.id, req.session.account_id)))
            .then((thread_id) => {
                res.json({status: 200});
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.get('/threads', (req, res) => {
        req.checkQuery('course_id').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Thread.getByThread(req.query.course_id, req.session.account_id)))
            .then((threads) => {
                let mappedThreads = threads.map(thread => thread.json());
                res.json({
                    thread_id: req.query.thread_id,
                    count: mappedThreads.length,
                    threads: mappedThreads
                });
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    /* Course */
    app.post('/course', (req, res) => {
        req.checkBody('name').notEmpty();
        req.checkBody('description').notEmpty();
        req.checkBody('start_date').notEmpty().isInt();
        req.checkBody('finish_date').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Course.post(req.body, req.session.account_id)))
            .then((course) => {
                res.json(course.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.get('/course', (req, res) => {
        req.checkQuery('course_id').notEmpty().isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Course.get(req.query.course_id, req.session.account_id)))
            .then((course) => {
                res.json(course.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    app.get('/courses', (req, res) => {
        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Course.getByAccount(req.session.account_id)))
            .then((courses) => {
                let mappedCourses = courses.map(course => course.json());
                res.json({
                    count: mappedCourses.length,
                    courses: mappedCourses
                });
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });
    });

    /* Vote */
    app.put('/vote', (req, res) => {
        req.checkBody('thread_id').optional().isInt();
        req.checkBody('answer_id').optional().isInt();

        if (!req.body.thread_id && !req.body.answer_id) {
            res.status(400);
            res.json({error: {reason: 'Bad request.'}});
        } else {
            let promise = req.getValidationResult()
                .then((validation) => (ConditionalPromise(validation.isEmpty())))
                .then(() => (Models.Vote.put(req.body, req.session.account_id)))
                .then((vote) => {
                    res.json(vote.json());
                })
                .catch(() => {
                    res.status(400);
                    res.json({error: {reason: 'Bad request.'}});
                });
        }
    });

    app.delete('/vote/thread/:id', (req, res) => {
        req.checkParams('id').isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Vote.delete({thread_id: req.params.id}, req.session.account_id)))
            .then((vote) => {
                res.json(vote.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });

    });

    app.delete('/vote/answer/:id', (req, res) => {
        req.checkParams('id').isInt();

        let promise = req.getValidationResult()
            .then((validation) => (ConditionalPromise(validation.isEmpty())))
            .then(() => (Models.Vote.delete({answer_id: req.params.id}, req.session.account_id)))
            .then((vote) => {
                res.json(vote.json());
            })
            .catch(() => {
                res.status(400);
                res.json({error: {reason: 'Bad request.'}});
            });

    });
};

module.exports = Controller;
