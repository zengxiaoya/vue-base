/**
 *  @author zengya
 *  @date 2020-10-10
 *  @description webpack的基础配置项
 *  此文件用于配置开发环境和生产环境的通用配置项 
 */

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 用于生成html文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin=require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
module.exports = {
	// 打包的入口
	entry: {
		bundle: path.resolve(__dirname, '../src/index.js')
	},
	stats: { // 控制台日志输出的配置
		modules: false, // 是否打印模块信息
		children: false, // 是否打印子模块信息
		chunks: false, // 是否打印模块信息
		chunkGroups: false, // 是否打印chunk分组信息
		chunkModules: false, // 是否打印模块信息
		colors: true    // 在控制台展示颜色
	},
	// 打包的输入
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash].js',
		publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
	},
	resolve: {
		extensions: ['*', '.js', '.json', '.vue'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, '../src'), // 使用 @ 来代替 src路径
		}
	},
	// 打包编译的规则配置
	module: { 
		rules: [
			{ 
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpeg|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
							// 解析时会出问题：[object Module]
							// 解决：关闭url-loader的es6模块化，使用commonjs解析
							esModule: false,
							limit: 8 * 1024,
							name: 'images/[name]-[hash:7].[ext]'
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader'
					}
				]
			},	
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.(css|scss)$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	// 打包编译中需要的插件配置项
	plugins: [
		new FriendlyErrorsWebpackPlugin(),
		new VueLoaderPlugin(), // vueloader 插件
		new webpack.optimize.SplitChunksPlugin(), // 分割Chunks
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../index.html') // 生成html文件的基础模版
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name]-[hash].css',//所有抽离出的样式文件，放进dist下的css目录
		}),
		new WebpackBar({
			profile: true,
			color: '#09c'
		}),
	]
};