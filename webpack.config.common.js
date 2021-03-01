const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//导入css打包插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');



module.exports = {
    /*
    entry: 指定需要打包的文件
    * */
    entry: "./src/js/index.js",
    /*
    output: 指定打包之后的文件输出的路径和输出的文件名称
    * */
    output: {
        // publicPath: './',
        /*
        filename: 指定打包之后的JS文件的名称
        * */
        filename: "./js/bundle.js",
        /*
        path: 指定打包之后的文件存储到什么地方
        * */
        path: path.resolve(__dirname, "bundle")
    },
    /*
    module: 告诉webpack如何处理webpack不能够识别的文件
    * */
    module: {
        rules: [
            //热打包js
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        "presets": [
                            ['@babel/preset-env',{
                                "targets": {
                                    "chrome": "58"
                                },
                                // useBuiltIns: "usage"
                            }]
                        ],
                        "plugins": [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "absoluteRuntime": false,
                                    "corejs": 2,
                                    "helpers": true,
                                    "regenerator": true,
                                    "useESModules": false,
                                    "version": "7.0.0-beta.0"
                                }
                            ]
                        ]
                    }
                }
            },
            // 打包字体图标规则
            {
                test: /\.(eot|json|svg|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // 指定打包后文件名称
                            name: '[name].[ext]',
                            // 指定打包后文件存放目录
                            outputPath: 'font/',
                        }
                    }
                ]
            },
            //图片
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            esModule: false,
                            limit: 1024 * 100,
                            name:'[name].[ext]',
                            outputPath:'images/',
                            publicPath: './images'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ]
            },
            //打包html中图片
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            },
            //css
            {
                test: /\.css$/,
                use: [
                    // 'style-loader', 'css-loader'
                    {
                        // loader: "style-loader"
                        loader:MiniCssExtractPlugin.loader,
                        options:{
                            hmr:true
                        }
                    },
                    {
                        loader: "css-loader",
                        //开启css模块化
                        // options:{
                        //     modules:true
                        // }
                    },
                    {
                        loader:"postcss-loader"
                    }
                ]
            },
            //less
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                },{
                    loader:"postcss-loader"
                }]
            },
            //scss
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                },{
                    loader:"postcss-loader"
                }]
            }
        ]
    },
    //plugins:告诉webpack需要新增一些什么样的功能
    plugins: [
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin([{
        //     // patterns: [
        //     //     { from: "./doc",
        //     //         to: 'doc' }
        //     // ],
        // }])
        //css打包参数
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
    ]
};