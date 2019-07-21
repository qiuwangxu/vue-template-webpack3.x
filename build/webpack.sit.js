const webpack = require('webpack')
const merge = require('webpack-merge')
const uglifyJSPlugin = require('uglifyjs-webpack-plugin')
const common = require('./webpack.base')
 
module.exports = merge(common, {
    devtool: 'source-map',
    mode: 'development',  //webpack3.x不需要
    plugins: [
        new uglifyJSPlugin({
            sourceMap: true
		}),
		new webpack.DefinePlugin({
			'process.env.Mock': false   //引入mock数据时，对单元测试有效
		})
    ]
})