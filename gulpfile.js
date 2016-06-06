const gulp = require('gulp');

require('./.gulp/app');
require('./.gulp/d3fc');
require('./.gulp/vendor');

gulp.task('watch', ['build'], () => {
  gulp.watch('src/js/**/*.js', ['app', 'd3fc']);
});

gulp.task('build', [
  'app',
  'd3fc',
  'vendor'
]);

gulp.task('default', ['watch']);
