/* Account */

module.exports = (dao) => {

    var Model = function (data) {
        this.id = data.account_id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password || undefined;
    };

    Model.get = (account_id) => {
        return new Promise((resolve, reject) => {
            account_id = parseInt(account_id);

            dao.get().query(`
                SELECT account_id, name, email
                FROM Account WHERE account_id = ?`,
                [account_id],
                (err, results) => {
                    if (results.length === 0) {
                        reject();
                    } else {
                        resolve(new Model(results[0]));
                    }
                });
        });
    };

    Model.getByEmail = (email) => {
        return new Promise((resolve, reject) => {
            dao.get().query(`
                SELECT account_id, name, email, password
                FROM Account WHERE email = ?`,
                [email],
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
