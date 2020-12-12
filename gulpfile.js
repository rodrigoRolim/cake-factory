const { src, dest, watch, parallel, series } = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const clean = require('gulp-clean')
const gulpif = require('gulp-if')
const nodemon = require('gulp-nodemon')
function isJavascript (file) {

  return file.extname === '.js'
}


function compileServer () {
  var stream = src('server.js')
    .pipe(plumber())
    .pipe(gulpif(isJavascript, babel({
      presets: ['@babel/preset-env']
    })))
    .pipe(dest('build'))
  return stream
}

const compiler = parallel(compileServer, function () {

  var stream = src(['src/**/*.js', 'src/config/*.json'])
    .pipe(plumber())
    .pipe(gulpif(isJavascript, babel({
      presets: ['@babel/preset-env']
    })))
    .pipe(dest('build/src'))

  return stream
})
function watchCompiler (cb) {
  watch(
    ['src/**/*.js', 'src/config/*.json', 'server.js'], 
    { ignoreInitial: false }, compiler)
  cb()
}
function execute (done) {
  
  var stream = nodemon({
    script: 'build/server.js',
    ext: 'js',
    ignore: [
      'var/',
      'node_modules/'
    ],
    watch: ['build/src/**/*.js', 'build/src/config/*.json', 'build/server.js'],
    done: done
  })
  stream
  .on('restart', function () {
    console.log("the server was restarted!")
  })
  .on('crash', function () {
    console.log('The application has crashed\n')
    stream.emit('restart', 10)
  })
  done()
  return stream
}
exports.build = compiler
exports.default = series(watchCompiler, execute)
