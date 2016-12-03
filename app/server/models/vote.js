/* Answer */

module.exports = (dao) => {

    var Model = function (data) {
        this.answer_id = data.answer_id;
        this.thread_id = data.thread_id;
        this.votes = parseInt(data.votes);
        this.voted = data.voted == 1;

        let answer_id = {};
        if (this.answer_id) {
            answer_id = { answer_id: this.answer_id };
        }

        this.json = () => (Object.assign({
            thread_id: this.thread_id,
            votes: this.votes,
            voted: this.voted
        }, answer_id));
    };

    Model.get = (vote, account_id) => {
        return new Promise((resolve, reject) => {
            let thread_id = vote.thread_id || null;
            let answer_id = vote.answer_id || null;
            account_id = parseInt(account_id);

            let noun = answer_id ? 'Answer' : 'Thread';
            let column = noun.toLowerCase() + '_id';

            dao.get().query(`
                SELECT (
                    SELECT COUNT(*) FROM ${noun}Vote WHERE ${column} = ?
                ) as votes, (
                    IFNULL((
                        SELECT 1 FROM ${noun}Vote WHERE ${column} = ? AND created_by = ?
                    ), 0)
                ) as voted
                `,
                [answer_id || thread_id, answer_id || thread_id, account_id],
                (err, results) => {
                    if (err || results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    Model.put = (vote, account_id) => {
        return new Promise((resolve, reject) => {
            let thread_id = vote.thread_id || null;
            let answer_id = vote.answer_id || null;
            account_id = parseInt(account_id);

            let noun = answer_id ? 'Answer' : 'Thread';
            let column = noun.toLowerCase() + '_id';

            dao.get().query(`INSERT INTO ${noun}Vote (${column}, created_by) VALUES (?, ?)`,
                [answer_id || thread_id, account_id],
                (err, results) => {
                    if (err) {
                        reject();
                    } else {
                        Model.get(vote, account_id).then((r) => { resolve(r); }).catch(reject);
                    }
                });
        });
    };

    Model.delete = (vote, account_id) => {
        return new Promise((resolve, reject) => {
            let thread_id = vote.thread_id || null;
            let answer_id = vote.answer_id || null;
            account_id = parseInt(account_id);

            let noun = answer_id ? 'Answer' : 'Thread';
            let column = noun.toLowerCase() + '_id';
            console.log(`DELETE FROM ${noun}Vote WHERE ${column} = ? AND created_by = ?`);
            dao.get().query(`
                DELETE FROM ${noun}Vote WHERE ${column} = ? AND created_by = ?`,
                [answer_id || thread_id, account_id],
                (err, results) => {
                    if (err || results.affectedRows === 0) {
                        reject();
                    } else {
                        Model.get(vote, account_id).then(resolve).catch(reject);
                    }
                });
        });
    };

    return Model;
};
