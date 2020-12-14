const { src, dest, watch, series } = require('gulp')
const babel = require('gulp-babel')
const plumber = require('gulp-plumber')
const nodemon = require('gulp-nodemon')

function compileServer (cb) {
  
  src('server.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(dest('build'))
  cb()
}

const compiler = series(compileServer, function (cb) {

  src(['src/**/*.js'])
    .pipe(plumber())
    .pipe(babel({
      presets: ['@babel/preset-env'],
      plugins: [
        ['@babel/transform-runtime']
      ]
    }))
    .pipe(dest('build/src'))
  cb()

})
function watchCompiler (cb) {
  watch(
    ['src/**/*.js'], 
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
    watch: ['build/**/**/*.js'],
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
}
exports.build = compiler
exports.default = series(watchCompiler, execute)
