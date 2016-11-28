var glob = require('glob');
var path = require('path');

var views = {};
var viewFiles = glob.sync('./src/js/views/*.js');
for (let view of viewFiles) {
    views['views/' + path.basename(view, '.js')] = view;
}

module.exports = {
    entry: Object.assign({
        'veranda': './src/js/veranda.js'
    }, views),
    output: {
        path: './dist/js',
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
