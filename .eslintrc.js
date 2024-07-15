{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "airbnb-base"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "double",
            {
                "avoidEscape": true
            }
        ],
        "max-len": "warn",
        "no-unused-vars": "warn",
        "no-console": "off",
        "no-param-reassign": "off",
        "lines-between-class-members": "off",
        "import/no-unresolved": "off",
        "import/extensions": "off",
        "consistent-return": "off"
    },
    "overrides": [
        {
            "files": [
                "*.ts"
            ],
            "rules": {}
        }
    ],
    "parserOptions": {
        "project": "./tsconfig.json"
    }
}