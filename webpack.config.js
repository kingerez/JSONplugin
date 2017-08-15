const webpack = require('webpack');

module.exports = [{
    context: __dirname + '/plugin/popup',
    entry: __dirname + '/plugin/popup/dev/index.js',
    output: {
        path: __dirname + '/plugin/popup/compiled/',
        filename: 'bundle.js'
    },
    target: 'web',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.json']
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel-loader']},
            {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']}
        ]
    },
    devtool: 'eval-source-map'
}, {
    context: __dirname + '/plugin/content',
    entry: __dirname + '/plugin/content/js/index.js',
    output: {
        path: __dirname + '/plugin/content/compiled/',
        filename: 'bundle.js'
    },
    target: 'web',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.json']
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel-loader']},
            {test: /(\.css)$/, loaders: ['style-loader', 'css-loader']}
        ]
    },
    devtool: 'eval-source-map'
}];
