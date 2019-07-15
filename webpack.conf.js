const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.jade$/,
                loaders: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: false,
                        },
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            data: {
                                date: '15.07.2019',
                            },
                            pretty: true
                        }
                    },
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                    'stylus-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.jade',
            inject: true,
            filename: 'index.html',
        }),
        new CopyWebpackPlugin([
            { from: 'src/public' },
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};
