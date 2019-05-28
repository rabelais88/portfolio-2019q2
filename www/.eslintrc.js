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
		'object-curly-newline': 'warn',
		'react/button-has-type': 'off',
		'class-methods-use-this': 'off',
		'jsx-a11y/label-has-associated-control': 'off',
		'jsx-a11y/label-has-for': 'off',
		'react/no-array-index-key': 'warn',
		'jsx-a11y/anchor-is-valid': 'warn',
		'jsx-a11y/no-static-element': 'warn',
	}
};
