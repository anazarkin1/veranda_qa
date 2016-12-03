/* Models */

var constants = require('./constants');

/* Pass in DB instance. */
var models = (dao) => (
    {
        Account: require('./models/account')(dao),
        Course: require('./models/course')(dao),
        Answer: require('./models/answer')(dao),
        Comment: require('./models/comment')(dao)

    }
);

module.exports = models;
