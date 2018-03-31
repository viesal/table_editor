'use strict';

const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, './static'),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/, /static/]
            },
            {
                // TODO: use postcss
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: [/static/]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: "file-loader"
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    }
};