// webpack.config.js
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: 'production',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[chunkhash:8].css'
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin({
                parallel: true, // 开启多线程压缩
                terserOptions: {
                    compress: {
                        pure_funcs: ['console.log'] // 删除console.log
                    }
                }
            })
        ]
        // minimize: false
    },
    output: {
        filename: 'js/[name]_[chunkhash:8].js',
        path: path.resolve(__dirname, '../build')
    },
    module: {
        rules: [
            {
                test: /\.(svg|png|jpg|jpeg|gif)$/,
                generator: {
                    filename: 'images/[name]_[hash:8][ext]'
                }
            }
        ]
    }
});
