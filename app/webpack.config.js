module.exports = {
    entry: {
        'vendor': ['moment'],
        'veranda': './src/js/veranda.js',
		
		/* Views */
		'views/index': './src/js/views/index.js'
    },
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
