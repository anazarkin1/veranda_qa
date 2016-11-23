var constants = require('./server/constants');
var express = require('express');
var http = require('http');
var path = require('path');
var ejs = require('ejs');

var app = express();
app.use('/css', express.static(path.join(__dirname, 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'dist', 'js')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

var httpServer = http.Server(app);

/* Routes */
require('./server/routes')(app);

httpServer.listen(constants.PORT, () => {
    console.log(`Starting server on port: ${constants.PORT}`);
});
