const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const _extraName = [];
fs.readdirSync(path.join(__dirname, '../src/html/')).forEach((item) => {
    _extraName.push(item.replace('.html', ''));
});
console.log(_extraName);
module.exports = {
    entry: (() => {
        const _extraPath = path.join(__dirname, '../src/js/external');
        const _entry = {
            index: './src/js/home.js',
            main: './src/js/main.js',
            cssmain: './src/css/main.scss',
            mangoJam: './common/js/mangoMessenger.js'
        };
        const _suffix = ['.js'];
        _extraName.forEach((_name) => {
            let _path;
            for (let i = 0; i < _suffix.length; i++) {
                const _testPath = path.join(_extraPath, _name + _suffix[i]);
                if (fs.existsSync(_testPath)) {
                    _path = _testPath;
                    break;
                }
            }
            if (_path) {
                _entry[_name] = _path;
            }
        });
        return _entry;
    })(),
    plugins: (() => {
        const _commonChunks = ['mangoJam', 'main', 'cssmain'];
        const _arr = [
            new CleanWebpackPlugin(),
            new webpack.DefinePlugin({
                'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
            }),
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                title: '监控日志',
                // favicon: './src/img/jiankong.png',
                template: 'src/home.html',
                inject: true,
                chunks: _commonChunks.concat('index')
            })
        ];
        _extraName.forEach((_name) => {
            _arr.push(
                new HtmlWebpackPlugin({
                    title: _name + ' test',
                    filename: `${_name}.html`,
                    template: `src/html/${_name}.html`,
                    chunks: _commonChunks.concat(_name)
                })
            );
        });
        return _arr;
    })(),
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['autoprefixer']
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isDev
                        ? 'style-loader'
                        : {
                              loader: MiniCssExtractPlugin.loader
                          },
                    'css-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'data/[name].[ext]'
                    }
                }
            },
            {
                test: /\.js|jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                        cacheDirectory: true
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        //后缀名自动补全，引入时可不必写后缀名
        extensions: ['.js', '.jsx']
    }
};
