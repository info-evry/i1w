module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true,
		'browser': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': { 'ecmaVersion': 12 },
	'rules': {
		'curly': [
			'error',
			'all'
		],
		'brace-style': [
			'error',
			'1tbs',
			{ 'allowSingleLine': true }
		],
		'object-curly-newline': [
			'warn',
			{ 'multiline': true }
		],
		'object-curly-spacing': [
			'warn',
			'always'
		],
		'eqeqeq': [
			'warn',
			'always'
		],
		'guard-for-in': [
			'off'
		],
		'no-use-before-define': [
			'error',
			{ 'functions': true }
		],
		'no-undef-init': [
			'error'
		],
		'no-shadow': [
			'off'
		],
		'no-unreachable-loop': [
			'error'
		],
		'no-inner-declarations': [
			'off'
		],
		'no-loop-func': [
			'off'
		],
		'no-throw-literal': [
			'error'
		],
		'wrap-iife': [
			'error',
			'inside'
		],
		'no-undef': [
			'error'
		],
		'no-unused-vars': [
			'off'
		],
		'no-extra-parens': [
			'error',
			'all'
		],
		'comma-dangle': [
			'error',
			'never'
		],
		'no-var': [
			'error'
		],
		'indent': [
			'error',
			'tab'
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		]
	}
};
