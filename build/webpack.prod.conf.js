/**
 *  @author zengya
 *  @date 2020-10-10
 *  @description webpack的生产环境配置项
 *  此文件用于配置生产环境配置项 
 */

const { merge } = require('webpack-merge'); // merge 用于合并基础配置项
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 用于把dist (就是放生产环境目录)的文件先清除干净，再生成新的。
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
console.log('please watting,the project is buildding ...');
module.exports = merge(baseConfig, {
	mode: 'production',
	// devtool: 'source-map', // 整个 source map 作为一个单独的文件生成。
	stats: 'errors-only',
	performance: {
		maxEntrypointSize: 50000000,
		maxAssetSize: 5000000
	},
	module: {
		rules: [
		]
	},
	plugins: [
		new CleanWebpackPlugin({
			dry: true,
			verbose: true,
			cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')]
		}),
		new CopyWebpackPlugin({
			patterns: [{
				from: path.resolve(__dirname, '../static'),
				to: 'static'
			}]
		})
	]
});