const  Webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require("webpack-merge");
const CommonConfig = require("./webpack.config.common");


module.exports = merge.merge(CommonConfig,{
    devServer: {
        contentBase: './bundle',
        compress: true,
        open:true,
        port: 9000,
        /*
        可以设置跨域问题
         proxy:{
          以下配置的含义:
          当我们在代码中发送请求到/user的时候, devServer就会自动将我们请求的地址替换为
          http://127.0.0.1:3000/user
          "/user": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,     // 域名跨域
                secure: false,          // https跨域
        }
        * */
        hot:true, //开启热更新，只要开启了热更新就不会自动刷新网页了
        hotOnly:true //哪怕不支持热更新也不要刷新网页
    },
    /*
    配置sourcemap
    development: cheap-module-eval-source-map
    production: cheap-module-source-map
    * */
    // devtool: "cheap-module-eval-source-map",
    /*
    mode: 指定打包的模式, 模式有两种
    一种是开发模式(development): 不会对打包的JS代码进行压缩
    还有一种就是上线(生产)模式(production): 会对打包的JS代码进行压缩
    * */
    mode: "development", // "production" | "development"
    //plugins:告诉webpack需要新增一些什么样的功能
    plugins: [
        new HtmlWebpackPlugin({
            //指定模板
            template:"./src/index.html"
        }),
        new Webpack.HotModuleReplacementPlugin()
    ]
});