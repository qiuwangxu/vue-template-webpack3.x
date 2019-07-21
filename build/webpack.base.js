const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')  // 如果vue-loader 版本为15.x需要
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'../dist'),
        filename: 'compiled/js/[name]-[hash:8].js',
        chunkFilename: 'compiled/js/[name]-[chunkhash:8].js'
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /^((?!bmap).)*\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, 'src')],
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.(sass|scss)$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|bmp|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?outputPath=compiled/img/'
                ]
            }
        ]
    },
    resolve: {
        //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            '~': path.resolve(__dirname, '../src/components')
        }
    },
    plugins: [
        new VueLoaderPlugin(),  // 如果vue-router 版本为15.x需要
        new CleanWebpackPlugin(), //如果为插件版本较低则为(['dist'],{
            //root: path.resolve(__dirname, '../')
        //})   例如^0.1.19
        new copyWebpackPlugin([
			{ from: 'src/static'}
        ]),
        new extractTextPlugin('[name]-[hash:8].css'),
        // new extractTextPlugin({
        //     filename: '[name]-[hash:8].css',
        //     allChunks: true
        // }),   //如果为webpack3则为 new extractTextPlugin('[name]-[hash:8].css'),
        new htmlWebpackPlugin({
            template: './src/view/index.html',
            hash: true
        })
    ]
}