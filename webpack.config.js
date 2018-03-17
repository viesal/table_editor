'use strict';

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + '/static',
    filename: "build.js"
	},
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /public/]
            }
        ]
    }
};