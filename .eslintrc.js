module.exports = {
    "env": {
        "jest": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "jsx": true
          },
        "sourceType": "module"
    },
    "rules": {   
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
