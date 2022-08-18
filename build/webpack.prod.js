const {merge}=require("webpack-merge")
const {BaseConfig,resolve}=require("./webpack.base")
const Webpack=require("webpack")
const {CleanWebpackPlugin}=require("clean-webpack-plugin")
const MiniCSSExtractPlugin=require("mini-css-extract-plugin")
const PurgecssPlugin=require("purgecss-webpack-plugin")
const CSSMinimizerPlugin=require("css-minimizer-webpack-plugin")
const TerserPlugin=require("terser-webpack-plugin")
const CompressionPlugin=require("compression-webpack-plugin")
const globall=require("glob-all")
module.exports=merge(BaseConfig,{
    mode:'production',
   
    plugins:[
        new MiniCSSExtractPlugin({
            filename:'css/[name].[contenthash:8].css'
        }),
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            test:/.(js|css)$/,
            threshold:10240
        })
    ],
    optimization:{
        minimizer:[
            new CSSMinimizerPlugin(),
            new PurgecssPlugin({
                paths:globall.sync([
                    resolve('src/**/*.js'),
                    resolve("publick/index.html")
                ])
            }),
            new TerserPlugin({
                parallel:true,
                terserOptions:{
                    compress:{
                        pure_funcs:['console.log']
                    }
                }
            })
        ],
        splitChunks:{
            chunks:'all'
        }
    }
})