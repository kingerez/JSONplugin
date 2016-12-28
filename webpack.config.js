module.exports = [{
    context: __dirname + '/plugin/popup',
    entry: __dirname + '/plugin/popup/dev/index.js',
    output: {
        path: __dirname + '/plugin/popup/compiled/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exlude: /node_modules/,
            loader: 'babel',
            query: { presets: ['es2015'], plugins: ['transform-class-properties'] }
        }, {
            test: /\.css$/,
            exlude: /node_modules/,
            loader: 'style-loader!css-loader?sourceMap'
        }]
    }
}, {
    context: __dirname + '/plugin/content',
    entry: __dirname + '/plugin/content/js/index.js',
    output: {
        path: __dirname + '/plugin/content/compiled/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exlude: /node_modules/,
            loader: 'babel',
            query: { presets: ['es2015'], plugins: ['transform-class-properties'] }
        }, {
            test: /\.css$/,
            exlude: /node_modules/,
            loader: 'style-loader!css-loader?sourceMap'
        }]
    }
}];