/*eslint-env es6*/
const gulp = require('gulp');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');

const browserifyConfig = {
  entries: 'src/js/bootstrapper.js',
  extensions: ['.js'],
  debug: true
};

const sourceMapsConfig = {
  loadMaps: true
};

const output = 'public/js';

gulp.task('devbuild', () => {
  return browserify(browserifyConfig)
          .transform(babelify)
          .bundle()
          .pipe(source('main.js'))
          //.pipe(buffer())
          //.pipe(sourcemaps.init(sourceMapsConfig))
          //.pipe(uglify().on('error', gutil.log))
          //.pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(output, {
            overwrite: true
          }));
});

gulp.task('build', () => {
  return browserify(browserifyConfig)
          .transform(babelify)
          .bundle()
          .pipe(source('main.js'))
          .pipe(gulp.dest(output, {
            overwrite: true
          }));
});

gulp.task('watch', ['devbuild'], () => {
  gulp.watch('src/js/**/*.js', ['devbuild']);
});

gulp.task('default', ['watch']);
