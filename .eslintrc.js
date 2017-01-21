module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: [
    'html',
    "flowtype"
  ],
  globals: { fetch: true, getComputedStyle: true },
  rules: {
    'semi': [1, 'never'],
    'operator-linebreak': [2, 'before', {
      overrides: {
        "=": "ignore",
        "?": "ignore",
        ":": "ignore"
      }
    }],
    'spaced-comment': 1,
    'comma-dangle': [1, 'only-multiline'],
    'arrow-parens': 0,
    'brace-style': 0,
    'no-multiple-empty-lines': 0,
    'flowtype/use-flow-type': 1,
    "flowtype/valid-syntax": 1,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-new': 0
  },
  settings: {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
}
