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
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: [ 'react' ],
	rules: {
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': 'off',
		'jsx-a11y/html-has-lang': 'warn',
		'arrow-parens': 'off',
		'no-unused-vars': 'warn',
		'import/prefer-default-export': 'off',
		'consistent-return': 'off',
		'func-names': 'off',
		'react/prop-types': 'off',
		'arrow-body-style': 'warn',
		'object-curly-newline': 'warn'
	}
};
