/* Answer */

module.exports = (dao) => {

    var Model = function (data) {
        this.comment_id = data.comment_id;
        this.thread_id = data.thread_id;
        this.answer_id = data.answer_id;
        this.created_by = data.created_by;
        this.created_by_name = data.created_by_name;
        this.content = data.content;
        this.updated_at = data.updated_time;
        this.created_at = data.created_time;
        this.is_anon = data.is_anon;

        this.json = () => ({
            comment_id: this.comment_id,
            thread_id: this.thread_id,
            answer_id: this.answer_id,
            created_by: this.created_by,
            created_by_name: this.created_by_name,
            content: this.content,
            updated_at: this.updated_at,
            created_at: this.created_at,
            is_anon: this.is_anon,
        });
    };

    Model.get = (thread_id, answer_id) => {
        return new Promise((resolve, reject) => {
            console.log(thread_id, answer_id);
            thread_id = parseInt(thread_id);
            if (answer_id != null) {
                answer_id = parseInt(answer_id);
            }

            dao.get().query(`
             SELECT T.comment_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, 
                  T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name
				  FROM Comment T
                  WHERE thread_id = ? AND answer_id = ?
                `,
                [thread_id, answer_id],
                (err, results) => {
                    if (err || results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    //FIXME: change to work for comments
    /*Model.getByThread = (account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);

            dao.get().query(`
     SELECT T.comment_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
     UNIX_TIMESTAMP(T.updated_at) as updated_time,
     T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
     ))) as created_by_name
     FROM Comment T
     WHERE thread_id = ?
     `,
     [thread_id],
                (err, results) => {
                    if (err || results.length === 0) {
                        reject();
                    } else {
                        resolve(results.map(result => (new Model(result))));
                    }
                });
        });
    };
     //FIXME: change to work for comments
    Model.post = (answer, account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);

            dao.get().query(`
                INSERT INTO Answer
                (thread_id, content, is_anon, created_by)
                VALUES
                (?, ?, ?, ?)`,
                [answer.thread_id, answer.content, answer.is_anon, account_id],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        Model.get(results.insertId, account_id).then(resolve).catch(reject);
                    }
                });
        });
    };
     //FIXME: change to work for comments
    Model.delete = (answer_id, account_id) => {
        return new Promise((resolve, reject) => {
            answer_id = parseInt(answer_id);
            account_id = parseInt(account_id);

            dao.get().query(`
                DELETE FROM Answer WHERE answer_Id = ? AND created_by = ?`,
                [answer_id, account_id],
                (err, results) => {
                    if (err || results.affectedRows === 0) {
                        reject();
                    } else {
                        resolve(answer_id);
                    }
                });
        });
    };
     */
    return Model;
};
