var express = require('express');
var http = require('http');
var path = require('path');

var ejs = require('ejs');

const PORT = 3000;

var app = express();
app.use('/css', express.static(path.join(__dirname, 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'dist', 'js')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

var httpServer = http.Server(app);

/* Routes */

app.get('/', (req, res) => {
    res.render('index');
});


httpServer.listen(PORT, () => {
    console.log(`Starting server on port: ${PORT}`);
});
