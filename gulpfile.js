const { src, dest, watch, series } = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')
const gulpif = require('gulp-if')

function isJavascript (file) {

  return file.extname === '.js'
}

function cleaner () {
  
  return src('dist', { allowEmpty: true })
    .pipe(plumber())
    .pipe(clean())
}

function builder () {

  return src(['src/**/*.js', 'src/config/*.json', 'server.js'])
    .pipe(plumber())
    .pipe(gulpif(isJavascript, babel({
      presets: ['@babel/preset-env']
    })))
    .pipe(dest('build'))
}

exports.build = builder
exports.default = function () {
  watch(['src/**/*.js', 'src/config/*.json', 'server.js'], { ignoreInitial: false }, series(cleaner, builder))
}
