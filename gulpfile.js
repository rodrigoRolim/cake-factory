const { src, dest, watch, parallel } = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')
const gulpif = require('gulp-if')

function isJavascript (file) {

  return file.extname === '.js'
}


function server (cb) {
  src('server.js')
    .pipe(plumber())
    .pipe(gulpif(isJavascript, babel({
      presets: ['@babel/preset-env']
    })))
    .pipe(dest('build'))
  cb()
}
function builder (cb) {

  src(['src/**/*.js', 'src/config/*.json'])
    .pipe(plumber())
    .pipe(gulpif(isJavascript, babel({
      presets: ['@babel/preset-env']
    })))
    .pipe(dest('build/src'))
  cb()
}

exports.build = builder
exports.default = function () {
  watch(['src/**/*.js', 'src/config/*.json', 'server.js'], { ignoreInitial: false }, parallel(builder, server))
}
