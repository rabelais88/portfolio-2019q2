module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true
	},
	extends: 'airbnb',
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		'arrow-parens': 'off',
		'no-unused-vars': 'warn',
		'import/prefer-default-export': 'off',
		'consistent-return': 'off',
		'func-names': 'off',
		'arrow-body-style': 'warn',
		'object-curly-newline': 'warn',
		'class-methods-use-this': 'off',
	}
};
