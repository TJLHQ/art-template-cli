const {merge}=require("webpack-merge")
const {BaseConfig}=require("./webpack.base")
const Webpack=require("webpack")
module.exports=merge(BaseConfig,{
    mode:'development',
    devtool:'eval-cheap-module-source-map',
    devServer:{
        compress:false,
        host:'localhost',
        port:'8888',
        hot:true
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ]
})