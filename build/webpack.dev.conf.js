/**
 *  @author zengya
 *  @date 2020-10-10
 *  @description webpack的开发环境配置项
 *  此文件用于配置开发环境配置项 
 */

const { merge } = require('webpack-merge'); // merge 用于合并基础配置项
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
module.exports = merge(baseConfig, {
	mode: 'development', // 模式名称
	devtool: 'inline-source-map', // source map 转换为 DataUrl 后添加到 bundle 中。
	devServer: { // webpack-dev-server 配置项
		contentBase: path.resolve(__dirname, '../dist'),
		open: true,
		port: 3000,
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.(vue|js)$/,
				loader: 'eslint-loader',
				enforce: 'pre', // 预处理
				exclude: /node_modules/,
				//eslint检查报告的格式规范
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, '../static'),
				to: 'static'
			}]
		}),
	]
});