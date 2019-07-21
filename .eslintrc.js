// https://eslint.org/docs/user-guide/configuring
 
module.exports = {
    root: true,
    parserOptions: {
      parser: 'babel-eslint'
    },
    env: {
      browser: true,
    },
    extends: [
      // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
      // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
      'plugin:vue/essential',
      // https://github.com/standard/standard/blob/master/docs/RULES-en.md
      'standard'
    ],
    // required to lint *.vue files
    plugins: [
      'vue'
    ],
    // add your custom rules here
    rules: {   // 这一部分根据个人喜好配置
      // allow async-await
      'generator-star-spacing': 'off',
      "no-tabs":"off",
      "quotes": [0, "single"],
      "new-cap": 0,
      "handle-callback-err": 0,
      'vue/no-side-effects-in-computed-properties': 'off',
      'no-undef':0,
      'no-unused-expressions': process.env.NODE_ENV === 'test' ? 'error' : 'off',
      "indent": [2, 4],//缩进风格
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
  }