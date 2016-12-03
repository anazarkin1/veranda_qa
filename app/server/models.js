/* Models */

var constants = require('./constants');

/* Pass in DB instance. */
var models = (dao) => (
    {
        Account: require('./models/account')(dao),
        Course: require('./models/course')(dao),
        Answer: require('./models/answer')(dao),
        Vote: require('./models/vote')(dao)
    }
);

module.exports = models;
