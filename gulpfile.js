const { src, dest, watch, series, tasks, task } = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')

function isJavascript (file) {

  return file.extname === '.js'
}

function clean () {
  
  return src('dist', { allowEmpty: true })
    .pipe(plumber())
    .pipe(clean())
}

function transpiler () {

  return src(['src/**/*.js', 'src/config/*.json', 'server.js'])
    .pipe(plumber())
    .pipe(isJavascript, babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest('build'))
}
