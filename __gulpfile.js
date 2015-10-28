var gulp = require('gulp');
var sass = require("gulp-sass");
var plumber = require('gulp-plumber');

gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(sass())
        .pipe(gulp.dest("./css/"));
});

gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
});
// gulp監視
gulp.task("default",['server'], function() {
    gulp.watch(['./assets/scss/*.scss'],['sass']); //scssファイルを監視
});