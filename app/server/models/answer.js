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
    };

    Model.get = (answer_id, account_id) => {
        return new Promise((resolve, reject) => {
            answer_id = parseInt(answer_id);
            account_id = parseInt(account_id);

            dao.get().query(`
                SELECT
                  answer_id, thread_id, created_by, content,
                  UNIX_TIMESTAMP(created_at) as created_time,
                  UNIX_TIMESTAMP(updated_at) as updated_time, is_anon,
                  (IF(is_anon = 1, '', (
                    SELECT name from Account WHERE account_id = created_by
                  ))) as created_by_name,
                  (SELECT COUNT(*) FROM AnswerVote WHERE
                    AnswerVote.answer_id = T.answer_id) as votes,
                  (SELECT COUNT(*) FROM AnswerVote WHERE
                    AnswerVote.created_by = ? AND
                    AnswerVote.answer_id = ?) as voted
                  FROM Answer
                  WHERE answer_id = ?`,
                [answer_id],
                (err, results) => {
                    if (results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    Model.post = (answer, account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);

            dao.get().query(`
                INSERT INTO Answer
                ()
                VALUES
                ()`,
                [answer_id],
                (err, results) => {
                    if (results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    return Model;
};
