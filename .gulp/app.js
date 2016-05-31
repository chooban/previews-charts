const browserify = require('browserify');
const gulp = require('gulp');
const libs = require('./vendor').libs;
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');

const production = (process.env.NODE_ENV === 'production');
const browserifyConfig = {
  entries: 'src/js/bootstrapper.js',
  extensions: ['.js'],
  debug: !production
};

const sourceMapsConfig = {
  loadMaps: true
};

const output = 'public/js';

gulp.task('app', () => {
  const b = browserify(browserifyConfig)
              .transform(babelify);

  libs.forEach(lib => b.external(lib));

  const stream = b
    .bundle().on('error', function(e) {
      gutil.log(e);
      this.emit('end');
    })
    .pipe(source('main.js'))
    .pipe(buffer());

  if (production) {
    stream.pipe(sourcemaps.init(sourceMapsConfig))
      .pipe(uglify().on('error', gutil.log))
      .pipe(sourcemaps.write('./'));
  }

  stream.pipe(gulp.dest(output, {
    overwrite: true
  }));

  return stream;
});
