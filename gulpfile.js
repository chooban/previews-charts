/*eslint-env es6*/
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

const browserifyConfig = {
  entries: 'src/js/bootstrapper.js',
  extensions: ['.js'],
  debug: true
};

gulp.task('devbuild', () => {
  return browserify(browserifyConfig)
          .transform(babelify)
          .bundle()
          .pipe(source('main.js'))
          .pipe(buffer())
          .pipe(sourcemaps.init({loadMaps: true}))
          .pipe(uglify())
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('public/js/', {
            overwrite: true
          }));
});

gulp.task('build', () => {
  return browserify(browserifyConfig)
          .transform(babelify)
          .transform(minifyify())
          .bundle()
          .pipe(source('main.js'))
          .pipe(gulp.dest('public/js/', {
            overwrite: true
          }));
});

gulp.task('watch', ['devbuild'], () => {
  gulp.watch('src/js/**/*.js', ['build']);
});

gulp.task('default', ['watch']);
