var path = require('path');
var webpack = require('webpack');
process.env.NODE_ENV == "production";

module.exports = {
    entry: './src/extension/js/xmlHttpWrapper.js',
    output: {
        path: __dirname,
        filename: './dist/injected.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'es6'),
                query: {
                  presets: 'es2015',
                },
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};