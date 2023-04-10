module.exports = {
  extends: [
    'stylelint-config-recess-order', // use the recess order for properties
    'stylelint-config-css-modules', // configure for CSS Modules methodology
  ],
  rules: {
    'rule-empty-line-before': null,
    'comment-empty-line-before': null,
    'color-hex-length': null,
    'custom-property-empty-line-before': null,
    'selector-class-pattern': null,
    'value-keyword-case': null,
    // 'at-rule-no-unknown': [true, { ignoreAtRules: ['apply'] }],
    'at-rule-no-unknown': null,
    'function-no-unknown': null,
    'declaration-empty-line-before': null,
  },
  ignoreFiles: ['dist/**/*', 'docs/**/*'],
};
