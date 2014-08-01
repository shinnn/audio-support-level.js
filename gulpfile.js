'use strict';

var exec = require('child_process').exec;

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mergeStream = require('merge-stream');

var rimraf = require('rimraf');
var stylish = require('jshint-stylish');
var toCamelCase = require('to-camel-case');
var wiredep = require('wiredep').stream;
var bowerInstall = require('bower').commands.install;

var pkg = require('./package.json');
var bower = require('./bower.json');

var funName = toCamelCase(pkg.name);
var depName = Object.keys(pkg.dependencies)[0];
var depVarName = toCamelCase(depName);

var banner = [
  '/*!',
  ' * <%= pkg.name %>.js | MIT (c) Shinnosuke Watanabe',
  ' * <%= pkg.homepage %>',
  '*/\n'
].join('\n');

var moduleExports = '\nvar <%= depVarName %> = require(\'<%= depName %>\');\n' +
                    'module.exports = <%= funName %>;\n';

gulp.task('lint', function() {
  gulp.src(['{,test/,src/}*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
  gulp.src('*.json')
    .pipe($.jsonlint())
    .pipe($.jsonlint.reporter());
});

gulp.task('clean:dist', rimraf.bind(null, 'dist'));

gulp.task('clean:test', rimraf.bind(null, 'tmp'));

gulp.task('build:dist', ['clean:dist'], function() {
  return mergeStream(
    gulp.src(['src/*.js'])
      .pipe($.header(banner + '!function(global) {\n', {pkg: pkg}))
      .pipe($.footer('\nglobal.<%= funName %> = <%= funName %>;\n}(this);\n', {
        funName: funName
      }))
      .pipe($.rename(bower.main))
      .pipe(gulp.dest('')),
    gulp.src(['src/*.js'])
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.footer(moduleExports, {
        funName: funName,
        depName: depName,
        depVarName: depVarName
      }))
      .pipe($.rename(pkg.main))
      .pipe(gulp.dest('')),
    gulp.src(['src/*.js'])
      .pipe($.wrapAmd({
        deps: [depName],
        params: [depVarName],
        exports: funName
      }))
      .pipe($.header(banner, {pkg: pkg}))
      .pipe($.rename(bower.main))
      .pipe($.rename({suffix: '-amd'}))
      .pipe(gulp.dest(''))
  );
});

gulp.task('bower-install', function() {
  return bowerInstall();
});

gulp.task('build:test', ['clean:test', 'bower-install'], function() {
  return mergeStream(
    gulp.src(['test/test.html'])
      .pipe(wiredep({
        devDependencies: true,
        includeSelf: true
      }))
      .pipe(gulp.dest('tmp')),
    gulp.src(['test/test.js'])
      .pipe($.esnext())
      .pipe(gulp.dest('tmp'))
  );
});

gulp.task('build', ['lint', 'build:dist', 'build:test']);

gulp.task('test', ['build'], function(cb) {
  exec('npm run-script casperjs', function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('watch', function() {
  gulp.watch(['{,src/,test/}*.js'], ['test']);
  gulp.watch(['*.json', '.jshintrc'], ['lint']);
});

gulp.task('default', ['test', 'watch']);
