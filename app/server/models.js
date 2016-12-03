/* Models */

var constants = require('./constants');

/* Pass in DB instance. */
var models = (dao) => (
    {
        Account: require('./models/account')(dao),
        Course: require('./models/course')(dao),
        Answer: require('./models/answer')(dao)
    }
);

module.exports = models;
