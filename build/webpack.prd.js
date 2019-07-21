const webpack = require('webpack')
const merge = require('webpack-merge')
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.base')
 
module.exports = merge(common, {
    mode:'production',  //webpack3.x不要
    plugins: [
        new uglifyJSPlugin(),
        new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),  // webpack3.x启用
			'process.env.Mock': false   // 引入mock时对单元测试有效
        })
    ]
})