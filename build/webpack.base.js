const path = require("path")
const fs = require('fs')
const MiniCSSExtractPlugin=require("mini-css-extract-plugin")
const HtmlPlugin=require("html-webpack-plugin")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const Webpack=require("webpack")
const resolve = (dir) => path.join(__dirname, '..', dir)
const isDev=process.env.NODE_ENV==='development'

const entrys=(route)=>{
    return fs.readdirSync(route).reduce((total,dir)=>{
        const pathDir=path.join(route,dir);
        const filename=path.join(pathDir,'index.js');
        if(fs.statSync(pathDir).isDirectory()&&fs.existsSync(filename)){
             total[dir]=filename
             return total
        }
    },{})
}
const inputFiles=entrys(resolve('src/pages'))
const BaseConfig={
    entry:inputFiles,
    cache:{
        type:'filesystem'
    },
    resolve:{
        extensions:['.js','.css','.scss'],
        preferRelative: true,
        alias:{
            '@':resolve('src'),
            "artTemplate":resolve('node_modules/art-template'),
            'handlebars': 'handlebars/dist/handlebars.js'
        },
        fallback: {
            fs: false,
            crypto: require.resolve("crypto-browserify")
          }
    },
    module:{
        rules:[
            {
                test:/.js$/,
                use:[
                    "thread-loader",
                    "babel-loader"
                ],
                exclude:/node_modules/
            },
            {
                test: /\.art$/,
                loader: "art-template-loader",
                include:resolve('src')
            },
            {
                test:/.(sc|c)ss$/,
                use:[
                    isDev?MiniCSSExtractPlugin.loader:'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test:/.(jpg|png|gif|jpeg|svg)$/,
                type:'asset',
                parser:{
                    dataUrlCondition:{
                        maxSize:10240
                    }
                },
                generator:{
                    filename:'images/[name].[contenthash:8][ext]'
                }
            }
        ]
    },
    plugins:[
       ...Object.keys(inputFiles).map(item=>(
            new HtmlPlugin({
                filename:`${item}.html`,
                template:resolve("public/index.html"),
                chunks:[item],
                inject:true,
                clean:true
            })
        )),
        new NodePolyfillPlugin(),
        new Webpack.ProvidePlugin({
            artTemplate:'artTemplate'
        })
    ],
    output:{
        filename:'js/[name].[contenthash:8].js',
        path:resolve('dist')
    }
}
module.exports={
    BaseConfig,
    resolve
}