const gulp = require('gulp')
const mocha = require('gulp-mocha')
const standard = require('gulp-standard')

gulp.task('watch', function () {
  gulp.watch(['src/**/*.js'], ['test'])
})

gulp.task('test', ['standard'], function () {
  return gulp.src(['src/**/test/*.js'])
    .pipe(
      mocha({ reporter: 'list', timeout: 1 * 1000 })
        .on('error', e => {
          console.dir(e)
        }))
    .on('error', e => {
      console.dir(e)
    })
})

gulp.task('standard', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('default', ['test', 'watch'])
