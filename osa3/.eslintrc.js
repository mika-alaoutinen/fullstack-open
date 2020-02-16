module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"commonjs": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018
	},
	"rules": {
		"arrow-spacing": [
			"error", { "before": true, "after": true }
		],
		"eqeqeq": "error",
		"indent": [
			"error",
			4
		],
		"linebreak-style": [
			"error",
			"windows"
		],
		"no-console": 0,
		"no-trailing-spaces": "error",
		"object-curly-spacing": [
			"error", "always"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"never"
		]
	}
}