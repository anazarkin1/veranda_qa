var constants = require('./server/constants');
var express = require('express');
var session = require('express-session');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();
app.use('/css', express.static(path.join(__dirname, 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'dist', 'js')));
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

var httpServer = http.Server(app);

/* Configure Session */
app.use(session({
    secret: 'Th1s!S4s3cRet',
    resave: false,
    saveUninitialized: false
}));

/* Routes */
require('./server/routes')(app);

httpServer.listen(constants.PORT, () => {
    console.log(`Starting server on port: ${constants.PORT}`);
});
