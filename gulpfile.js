const gulp = require('gulp')
const mocha = require('gulp-mocha')
const standard = require('gulp-standard')

gulp.task('watch', function() {
  gulp.watch(['./lib/src/**/*.js'], ['test'])
})

gulp.task('test', ['standard'], function() {
  return gulp.src(['lib/tests/*.js'])
  .pipe(
    mocha({reporter: 'list', timeout: 10 * 1000})
      .on('error', e => {
        console.dir(e)
        process.exit(1)
      }))
  .on('error', e => {
    console.dir(e)
    process.exit(1)
  });
})

gulp.task('standard', function () {
  return gulp.src(['lib/src/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('default', ['test', 'watch'])
