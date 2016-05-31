/*eslint-env es6*/
const gulp = require('gulp');

require('./.gulp/app');
require('./.gulp/vendor');

gulp.task('watch', ['vendor'], () => {
  gulp.watch('src/js/**/*.js', ['app']);
});

gulp.task('build', [
  'app',
  'vendor'
]);

gulp.task('default', ['watch']);
