const browserify = require('browserify');
const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const resolve = require('resolve');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const libs = [
  'bootstrap',
  'd3',
  'd3fc',
  'jquery',
  'lodash'
];

const production = (process.env.NODE_ENV === 'production');

gulp.task('vendor', () => {
  const b = browserify({
      entries: './.gulp/noop.js',
      extensions: ['.js'],
      debug: !production
    });

  libs.forEach((lib) => {
    b.require(resolve.sync(lib), { expose: lib });
  });

  const stream = b
    .bundle()
    .pipe(source('vendor.min.js'))
    .pipe(buffer())

  if (production) {
    stream.pipe(uglify().on('error', gutil.log));
  }
  stream.pipe(gulp.dest('public/js/', {
    overwrite: true
  }));

  return stream;
});

exports.libs = libs;

