/* Models */

var constants = require('./constants');

/* Pass in DB instance. */
var dao;
var models = (_dao) => {
    dao = _dao;
};

models.Course = function (data) {
    this.id = data.course_id;
    this.created_by = data.created_by;
    this.name = data.name;
    this.description = data.description;
    this.start_date = data.start_unix;
    this.finish_date = data.finish_unix;

    this.hasAccount = (account_id) => {
        account_id = parseInt(account_id);
        return new Promise((resolve, reject) => {
            dao.get().query(`
                (SELECT account_id FROM CourseStudent WHERE CourseStudent.course_id = ? AND CourseStudent.account_id = ?)
                UNION
                (SELECT account_id FROM CourseInstructor WHERE CourseInstructor.course_id = ? AND CourseInstructor.account_id = ?)
            `, [this.course_id, account_id, this.course_id, account_id],
            (err, results) => {
                if (results.length > 0) {
                    resolve();
                } else {
                    reject();
                }
            });
        });
    };
};

// Static method.
models.Course.get = (course_id) => {
    return new Promise((resolve, reject) => {
        course_id = parseInt(course_id);

        dao.get().query(`
            SELECT course_id, name, description,
                   UNIX_TIMESTAMP(start_date) as start_unix,
                   UNIX_TIMESTAMP(finish_date) as finish_unix
            FROM Course WHERE course_id = ?`,
            [course_id],
            (err, results) => {
                if (results.length === 0) {
                    reject();
                } else {
                    resolve(new models.Course(results[0]));
                }
            });
    });
};

module.exports = models;
