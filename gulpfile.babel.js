var gulp = require('gulp'),
  babel = require('gulp-babel'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps');

gulp.task('babel', () => {
  return gulp.src('app/main.babel.js')
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(rename('main.js'))
  .pipe(gulp.dest('app/'))
});

gulp.task('sass', () => {
  gulp.src('styles/main.scss')
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('styles/'))
});

gulp.task('stream', () => {
  gulp.watch('app/*.babel.js', ['babel']);
  gulp.watch('styles/*.scss', ['sass']);
});