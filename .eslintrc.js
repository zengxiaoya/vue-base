module.exports = {
	// 此目录为根目录，不再向上查找配置。
	root: true,
	// 解析器类型: espima(默认), babel-eslint, @typescript-eslint/parse……
	// parser: 'vue-eslint-parser',
	// 解析器配置参数
	parserOptions: {
		parser: 'babel-eslint',
		// 代码类型：script(默认), module
		sourceType: 'module'
	},
	env: {
		'browser': true,
		'es2020': true,
		'es6': true,
		'node': true
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/essential'
	],
	plugins: [
		'vue'
	],
	rules: {
		indent: [
			'error',
			'tab'
		],
		quotes: [
			'error',
			'single'
		],
		semi: [
			'error',
			'always'
		],
		'no-tabs': 'off', // 允许tab缩进
	}
};
