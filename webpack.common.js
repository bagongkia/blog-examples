const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
require('babel-polyfill')

module.exports = {
    entry: {
        'index': ['babel-polyfill', path.resolve(__dirname, 'src/index.js')]
    },
    output: {
        filename: '[name].bundled.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack's Code Splitting",
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: path.resolve(__dirname, 'src/index.html'),
            filename: path.resolve(__dirname, 'dist/index.html')
        })
    ]
}