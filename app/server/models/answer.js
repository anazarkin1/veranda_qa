/* Answer */

module.exports = (dao) => {

    var Model = function (data) {
        this.answer_id = data.answer_id;
        this.thread_id = data.thread_id;
        this.created_by = data.created_by;
        this.created_by_name = data.created_by_name;
        this.content = data.content;
        this.updated_at = data.updated_time;
        this.created_at = data.created_time;
        this.is_anon = data.is_anon;
        this.votes = parseInt(data.votes);
        this.voted = data.voted == 1;

        this.json = () => ({
            answer_id: this.answer_id,
            thread_id: this.thread_id,
            created_by: this.created_by,
            created_by_name: this.created_by_name,
            content: this.content,
            updated_at: this.updated_at,
            created_at: this.created_at,
            is_anon: this.is_anon,
            votes: this.votes,
            voted: this.voted
        });
    };

    Model.get = (answer_id, account_id) => {
        return new Promise((resolve, reject) => {
            answer_id = parseInt(answer_id);
            account_id = parseInt(account_id);

            dao.get().query(`
                SELECT
                  T.answer_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name,
                  (SELECT COUNT(*) FROM AnswerVote WHERE
                    AnswerVote.answer_id = T.answer_id) as votes,
                  (SELECT COUNT(*) FROM AnswerVote WHERE
                    AnswerVote.created_by = ? AND
                    AnswerVote.answer_id = T.answer_id) as voted
                  FROM Answer T
                  WHERE answer_id = ?`,
                [account_id, answer_id],
                (err, results) => {
                    if (err || results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    Model.getByThread = (thread_id, account_id) => {
        return new Promise((resolve, reject) => {
            thread_id = parseInt(thread_id);
            account_id = parseInt(account_id);

            dao.get().query(`
                SELECT
                  T.answer_id, T.thread_id, T.created_by, T.content,
                  UNIX_TIMESTAMP(T.created_at) as created_time,
                  UNIX_TIMESTAMP(T.updated_at) as updated_time, T.is_anon,
                  (IF(T.is_anon = 1, '', (
                    SELECT name from Account WHERE Account.account_id = T.created_by
                  ))) as created_by_name,
                  (SELECT COUNT(*) FROM AnswerVote WHERE
                    AnswerVote.answer_id = T.answer_id) as votes,
                  (SELECT COUNT(*) FROM AnswerVote WHERE
                    AnswerVote.created_by = ? AND
                    AnswerVote.answer_id = T.answer_id) as voted
                  FROM Answer T
                  WHERE thread_id = ?`,
                [account_id, thread_id],
                (err, results) => {
                    if (err || results.length === 0) {
                        reject();
                    } else {
                        resolve(results.map(result => (new Model(result))));
                    }
                });
        });
    };

    Model.post = (answer, account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);
            let is_anon = answer.is_anon === true || answer.is_anon === 1;
            dao.get().query(`
                INSERT INTO Answer
                (thread_id, content, is_anon, created_by, created_at, updated_at)
                VALUES
                (?, ?, ?, ?, NOW(), NOW())`,
                [answer.thread_id, answer.content, is_anon account_id],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        Model.get(results.insertId, account_id).then(resolve).catch(reject);
                    }
                });
        });
    };

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

    return Model;
};
