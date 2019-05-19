var gulp = require('gulp'),
  gulp_ts = require('gulp-typescript'),
  gulp_nodemon = require('gulp-nodemon'),
  gulp_sourcemaps = require('gulp-sourcemaps'),
  path = require('path');

const config = {
  tscInput: path.join(__dirname, 'src/**/*.ts*'),
  tscOutput: path.join(__dirname, 'dest/')
};

var tsProject = gulp_ts.createProject('tsconfig.json');

gulp.task('tsc', function () {
  return gulp.src(config.tscInput)
    .pipe(gulp_sourcemaps.init())
    .pipe(tsProject())
    .pipe(gulp_sourcemaps.write())
    .pipe(gulp.dest(config.tscOutput));
});

gulp.task('test', function () {

});

gulp.task('test-constant', function () {

});

gulp.task('server', function () {
  gulp.watch(config.tscInput, gulp.series('tsc'));

  gulp_nodemon({
    script: 'dest/server.js',
    ext: 'dest/**/*.js'
  });
});

gulp.task('default', gulp.series('tsc', 'server'), function (done) {
  done();
});

