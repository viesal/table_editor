'use strict';

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + '/static',
    filename: "build.js"
	},
  watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/, /static/]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                //exclude: [/node_modules/, /static/]
            }
        ]
    }
};