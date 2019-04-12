
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: './js/main.js',
    context: path.join(__dirname, 'src'),
    mode: "development",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(s)?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use:
                    [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
            filename: 'index.html'
        })
    ]
};