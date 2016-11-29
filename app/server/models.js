/* Models */

var constants = require('./constants');

/* Pass in DB instance. */
var models = (dao) => (
    {
        Account: require('./models/account')(dao),
        Course: require('./models/course')(dao)
    }
);

module.exports = models;
