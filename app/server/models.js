/* Models */

var constants = require('./constants');

/* Pass in DB instance. */
var models = (dao) => (
    {
        Account: require('./models/account')(dao),
        Course: require('./models/course')(dao),
        Answer: require('./models/answer')(dao),
        Vote: require('./models/vote')(dao),
        Thread: require('./models/thread')(dao),
        Comment: require('./models/comment')(dao)

    }
);

module.exports = models;
