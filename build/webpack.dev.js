const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: '[name]_[contentHash].js'
    },
    devServer: {
        port: 2333,
        open: true,
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新
        historyApiFallback: true, // 解决history路由404问题
        static: {
            directory: path.join(__dirname, '../common'), //托管静态资源public文件夹
            publicPath: '/common'
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort: 2334,
            openAnalyzer: true,
            logLevel: 'info'
        }),
        new webpack.DefinePlugin({
            DEVELOPMENT_MODE: true
        })
    ]
});
