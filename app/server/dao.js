/* Data Access Object */

var constants = require('./constants');
var mysql = require('mysql');

var dao = {
    connection: undefined,

    get: () => {
        if (!dao.connection) {
            dao.connection = mysql.createConnection({
                host: DB.HOST,
                user: DB.USER,
                password: DB.PASSWORD,
                database: DB.NAME
            });
            dao.get().connect();
        }
        return dao.connection;
    },

    end: () => {
        if (dao.connection) {
            dao.get().end();
        }
    }
};

module.exports = dao;
