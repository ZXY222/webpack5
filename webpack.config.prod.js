//css压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const CommonConfig = require("./webpack.config.common");

module.exports = merge.merge(CommonConfig,{
    /*
   * optimization:配置webpack的优化项
   * */
    optimization: {
        minimizer: [ new TerserJSPlugin({}),new OptimizeCSSAssetsPlugin({})],
    },
    /*
    配置sourcemap
    development: cheap-module-eval-source-map
    production: cheap-module-source-map
    * */
    devtool: "cheap-module-source-map",
    /*
    mode: 指定打包的模式, 模式有两种
    一种是开发模式(development): 不会对打包的JS代码进行压缩
    还有一种就是上线(生产)模式(production): 会对打包的JS代码进行压缩
    * */
    mode: "production", // "production" | "development"
    //plugins:告诉webpack需要新增一些什么样的功能
    plugins: [
        new HtmlWebpackPlugin({
            //指定模板
            template:"./src/index.html",
            minify:{
                collapseWhitespace:true
            }
        }),
    ]
});