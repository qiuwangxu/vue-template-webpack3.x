
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.base')
 
module.exports = merge(common, {
    devtool: '#eval-source-map',
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('test'),
			'process.env.Mock': true
		})
	]
})