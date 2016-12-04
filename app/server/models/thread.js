/* Thread */

module.exports = (dao) => {

    var Model = function (data) {
        this.thread_id = data.thread_id;
        this.course_id = data.course_id;
        this.created_by = data.created_by;
        this.created_by_name = data.created_by_name;
        this.is_anon = data.is_anon;
        this.content = data.content;
        this.updated_at = data.updated_time;
        this.created_at = data.created_time;

        this.json = () => ({
            thread_id: this.thread_id,
            course_id: this.course_id,
            created_by: this.created_by,
            created_by_name: this.created_by_name,
            is_anon: this.is_anon,
            content: this.content,
            updated_at: this.updated_at,
            created_at: this.created_at
        });
    };

    Model.get = (thread_id, account_id) => {
        return new Promise((resolve, reject) => {
            thread_id = parseInt(thread_id);
            account_id = parseInt(account_id);

            dao.get().query(`
                SELECT
                  T.course_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name,
                  (SELECT COUNT(*) FROM ThreadVote WHERE
                    ThreadVote.thread_id = T.thread_id) as votes,
                  (SELECT COUNT(*) FROM ThreadVote WHERE
                    ThreadVote.created_by = ? AND
                    ThreadVote.thread_id = T.thread_id) as voted
                  FROM Thread T
                  WHERE thread_id = ?`,
                [account_id, thread_id],
                (err, results) => {
                    if (err || results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    Model.getByCourse = (course_id, account_id) => {
        return new Promise((resolve, reject) => {
            course_id = parseInt(course_id);
            account_id = parseInt(account_id);

            dao.get().query(`
                SELECT
                  T.course_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name,
                  (SELECT COUNT(*) FROM ThreadVote WHERE
                    ThreadVote.thread_id = T.thread_id) as votes,
                  (SELECT COUNT(*) FROM ThreadVote WHERE
                    ThreadVote.created_by = ? AND
                    ThreadVote.thread_id = T.thread_id) as voted
                  FROM Thread T
                  WHERE course_id = ?
                  ORDER BY created_at DESC`,
                [account_id, course_id],
                (err, results) => {
                    if (err || results.length === 0) {
                        reject();
                    } else {
                        resolve(results.map(result => (new Model(result))));
                    }
                });
        });
    };

    Model.post = (thread, account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);
            let is_anon = thread.is_anon === true || thread.is_anon === 1;
            dao.get().query(`
                INSERT INTO Thread
                (course_id, content, is_anon, created_by, created_at, updated_at)
                VALUES
                (?, ?, ?, ?, NOW(), NOW())`,
                [thread.course_id, thread.content, is_anon, account_id],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        Model.get(results.insertId, account_id).then(resolve).catch(reject);
                    }
                });
        });
    };

    Model.delete = (thread_id, account_id) => {
        return new Promise((resolve, reject) => {
            thread_id = parseInt(thread_id);
            account_id = parseInt(account_id);

            dao.get().query(`
                DELETE FROM Thread WHERE thread_id = ? AND created_by = ?`,
                [thread_id, account_id],
                (err, results) => {
                    if (err || results.affectedRows === 0) {
                        reject();
                    } else {
                        resolve(answer_id);
                    }
                });
        });
    };

    return Model;
};
