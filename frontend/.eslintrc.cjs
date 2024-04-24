/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly',
  },
  plugins: [
    '@stylistic/js',
  ],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: "latest",
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },
  rules: {
    // TS
    "@typescript-eslint/no-explicit-any": "error",
    "no-debugger": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-console": ["warn"],
    // Vue
    "vue/max-attributes-per-line": "off",
    "vue/require-prop-types": "off",
    "vue/prefer-import-from-vue": "off",
    "vue/no-v-text-v-html-on-component": "warn",
    "vue/no-setup-props-reactivity-loss": "warn",
    "vue/block-order": [
      "error",
      {
        order: [["script", "template"], "style"],
      },
    ],
    "vue/block-tag-newline": [
      "error",
      {
        singleline: "always",
        multiline: "always",
      },
    ],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/component-options-name-casing": ["error", "PascalCase"],
    "vue/custom-event-name-casing": ["error", "camelCase"],
    "vue/define-macros-order": [
      "error",
      {
        order: ["defineProps", "defineEmits"],
      },
    ],
    "vue/html-comment-content-spacing": [
      "error",
      "always",
      {
        exceptions: ["-"],
      },
    ],
    "vue/no-restricted-v-bind": ["error", "/^v-/"],
    "vue/no-useless-v-bind": "error",
    "vue/padding-line-between-blocks": ["error", "always"],
    "vue/prefer-separate-static-class": "error",
    "@stylistic/js/array-bracket-spacing": ["error", "never"],
    "@stylistic/js/arrow-spacing": ["error", { before: true, after: true }],
    "@stylistic/js/block-spacing": ["error", "always"],
    "@stylistic/js/brace-style": ["error", "1tbs", { allowSingleLine: false }],
    "@stylistic/js/comma-dangle": ["error", "always-multiline"],
    "@stylistic/js/comma-spacing": ["error", { before: false, after: true }],
    "@stylistic/js/comma-style": ["error", "last"],
    "@stylistic/js/dot-location": ["error", "property"],
    "vue/dot-notation": ["error", { allowKeywords: true }],
    "vue/eqeqeq": ["error", "smart"],
    "@stylistic/js/key-spacing": ["error", { beforeColon: false, afterColon: true }],
    "@stylistic/js/keyword-spacing": ["error", { before: true, after: true }],
    "vue/no-constant-condition": "warn",
    "vue/no-empty-pattern": "error",
    "@stylistic/js/no-extra-parens": ["error", "functions"],
    "vue/no-irregular-whitespace": "error",
    "vue/no-loss-of-precision": "error",
    "vue/no-restricted-syntax": [
      "error",
      "DebuggerStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "vue/no-sparse-arrays": "error",
    "@stylistic/js/object-curly-newline": [
      "error",
      { multiline: true, consistent: true },
    ],
    "@stylistic/js/object-curly-spacing": ["error", "always"],
    "@stylistic/js/object-property-newline": [
      "error",
      { allowMultiplePropertiesPerLine: true },
    ],
    "vue/object-shorthand": [
      "error",
      "always",
      {
        ignoreConstructors: false,
        avoidQuotes: true,
      },
    ],
    "@stylistic/js/operator-linebreak": ["error", "before"],
    "vue/prefer-template": "error",
    "@stylistic/js/quote-props": ["error", "consistent-as-needed"],
    "@stylistic/js/space-in-parens": ["error", "never"],
    "@stylistic/js/space-infix-ops": "error",
    "@stylistic/js/space-unary-ops": ["error", { words: true, nonwords: false }],
    "@stylistic/js/template-curly-spacing": "error",
    //Default rules
    "vue/no-v-html": "error",
    "vue/require-default-prop": "off",
    "vue/require-explicit-emits": "off",
    "vue/multi-word-component-names": "off",
    "vue/require-v-for-key": "error",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
}
