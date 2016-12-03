/* Course */

module.exports = (dao) => {

    var Model = function (data) {
        this.course_id = data.course_id;
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

        this.json = () => ({
            course_id: this.course_id,
            created_by: this.created_by,
            name: this.name,
            description: this.description,
            start_date: this.start_date,
            finish_date: this.finish_date
        });
    };

    Model.getDefault = (account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);

            dao.get().query(`
                SELECT T.course_id, T.name, T.description, T.created_by,
                       UNIX_TIMESTAMP(T.start_date) as start_unix,
                       UNIX_TIMESTAMP(T.finish_date) as finish_unix
                FROM Course T WHERE EXISTS (
                    SELECT 1 FROM CourseInstructor CI WHERE CI.course_id = T.course_id AND CI.account_id = ?
                ) OR EXISTS (
                    SELECT 1 FROM CourseStudent CS WHERE CS.course_id = T.course_id AND CS.account_id = ?
                ) LIMIT 1`,
                [account_id, account_id],
                (err, results) => {
                    if (err || !results || results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    Model.get = (course_id) => {
        return new Promise((resolve, reject) => {
            course_id = parseInt(course_id);

            dao.get().query(`
                SELECT course_id, name, description, created_by,
                       UNIX_TIMESTAMP(start_date) as start_unix,
                       UNIX_TIMESTAMP(finish_date) as finish_unix
                FROM Course WHERE course_id = ?`,
                [course_id],
                (err, results) => {
                    if (err || !results || results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    return Model;
};
