const { src, dest, watch, series, tasks } = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')

task ('clean', function () {
  return src('dist', { allowEmpty: true })
    .pipe(plumber())
    .pipe(clean())
})

