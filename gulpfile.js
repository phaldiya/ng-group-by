'use strict';


var gulp = require('gulp');
var path = require('path');
var changelog = require('conventional-changelog');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var pkg = require(path.join(__dirname, 'package.json'));
var fs = require('fs');
var plugins = require('gulp-load-plugins')({
  config: path.join(__dirname, 'package.json'),
  lazy: true
});

var config = {
  src: {
    folder: 'src/',
    files: 'src/*.js'
  },
  test: {
    files: 'test/*.spec.js'
  }
};

var header = [
  '/**',
  ' * <%= pkg.name %>',
  ' * <%= pkg.description %>',
  ' * @author <%= pkg.authors[0] %>',
  ' * @version v<%= pkg.version %>',
  ' * @license <%= pkg.license %>',
  ' */\n'
].join('\n');

gulp.task('lint', function (done) {
  gulp.src(config.src.files)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.jshint.reporter('jshint-stylish'));
  done();
});

gulp.task('spec', function(done) {
  gulp.src(config.test.files, {read: false})
    .pipe(plugins.mocha({reporter: 'spec'}));
  done();
});

gulp.task('build', ['lint', 'spec'], function(done) {
  try {
    browserify({
      entries: 'ng-group-by-browserify.js',
      detectGlobals: false,
      basedir: './src/',
      debug: false,
      bundleExternal: true,
      transform: [['babelify', { presets: ['es2015'] }]]
    })
      .bundle()
      .pipe(source('ng-group-by.js'))
      .pipe(buffer())
      .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
      .pipe(plugins.header(header, {pkg: pkg}))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.uglifyEs.default({ecma: 5, ie8: true}))
      .on('error', plugins.util.log.bind(plugins.util, 'Uglify ES Error'))
      .pipe(plugins.rename({extname: '.min.js'}))
      .pipe(gulp.dest('dist/'));
  }catch(err){
    throw err;
  }
  done();
});

gulp.task('jscs', function() {
  return gulp.src(['src/*.js', 'test/*.js'])
    .pipe(plugins.jscs())
    .pipe(plugins.jscs.reporter());
});

gulp.task('default', ['lint', 'jscs', 'spec', 'build'], function() {
  gulp.watch(config.src.files, ['lint', 'spec', 'build']);
});

gulp.task('changelog', function(done) {
  var options = {
    repository: pkg.homepage,
    version: pkg.version,
    file: path.join(__dirname, 'CHANGELOG.md')
  };

  changelog(options, function(err, log) {
    if (err) {
      throw err;
    }

    fs.writeFile(options.file, log, done);
  });
});
