// karma.conf.js
 
var webpackConfig = require('./build/webpack.test.js')
 
module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
 
    files: ['test/**/*.spec.js'],
 
    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },
 
    webpack: webpackConfig,
 
    reporters: ['spec'],
 
    browsers: ['Chrome'],
    reporters: ['spec', 'coverage'],  //注释掉的为配置测试覆盖率后面会讲到
 
    coverageReporter: {
		dir: './coverage',
		reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }]
	}
  })
}