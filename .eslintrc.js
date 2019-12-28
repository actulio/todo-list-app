module.exports = {

	'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
		'react/jsx-filename-extension': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 'off',
    'comma-dangle': 'off'
	},
	
  // env: {
  //   es6: true,
  // },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
	},
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
		'react',
		'react-hooks',
		'jsx-a11y',
  ],
  // rules: {
	// 	"react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }]
  // },
};
