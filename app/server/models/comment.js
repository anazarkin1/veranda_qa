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

    Model.getById = (comment_id) => {
        return new Promise((resolve, reject) => {
            let sqlQuery = `
             SELECT T.comment_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, 
                  T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name
				  FROM Comment T
                  WHERE comment_id = ?

            `;
            comment_id = parseInt(comment_id);
            dao.get().query(sqlQuery,
                [comment_id],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    Model.getAllByThreadId = (thread_id) => {
        return new Promise((resolve, reject) => {
            thread_id = parseInt(thread_id);
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
                    if (err) {
                        reject();
                    } else {
                        resolve(results.map(result => (new Model(result))));
                    }
                });
        });
    };

    Model.getForQuestionByThreadId = (thread_id) => {
        return new Promise((resolve, reject) => {

            //Used for getting comments of the thread's question(answer_id is null)
            let sqlQuery = `
             SELECT T.comment_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, 
                  T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name
				  FROM Comment T
                  WHERE thread_id = ? AND answer_id is null

            `;

            thread_id = parseInt(thread_id);

            dao.get().query(sqlQuery,
                [thread_id],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(results.map(result => (new Model(result))));
                    }
                });


        });
    };


    Model.getByAnswerId = (answer_id) => {
        return new Promise((resolve, reject) => {

            //Used for getting comments of the thread's question(answer_id is null)
            let sqlQuery = `
             SELECT T.comment_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, 
                  T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name
				  FROM Comment T
                  WHERE answer_id = ?

            `;


            dao.get().query(sqlQuery,
                [parseInt(answer_id)],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(results.map(result => (new Model(result))));
                    }
                });

        });
    };
    Model.post = (comment, account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);

            dao.get().query(`
                INSERT INTO Comment 
                (thread_id,answer_id, content, is_anon, created_by)
                VALUES
                (?, ?, ?, ?, ?)`,
                [comment.thread_id, comment.answer_id, comment.content, comment.is_anon, account_id],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        Model.getById(results.insertId).then(resolve).catch(reject);
                    }
                });
        });
    };

    Model.delete = (comment_id, account_id) => {
        return new Promise((resolve, reject) => {
            comment_id = parseInt(comment_id);

            //TODO: add a check that account_id is the auther of the comment or an instructor in this course, if not
            //TODO: fail sql query

            account_id = parseInt(account_id);

            dao.get().query(`
                DELETE FROM Comment WHERE comment_id = ? `,
                [comment_id],
                (err, results) => {
                    if (err || results.affectedRows === 0) {
                        reject();
                    } else {
                        resolve(comment_id);
                    }
                });
        });
    };
    return Model;
};
