var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer")
var uglify = require("gulp-uglify");
var browser = require("browser-sync");
var plumber = require("gulp-plumber");

// gulp監視
gulp.task("default", function() {
    gulp.watch(['*.html'],['html']);    //htmlファイルを監視
	gulp.watch(['./assets/scss/*.scss'],['sass']); //scssファイルを監視
	gulp.watch(['./assets/css/*.css'],['html']); //cssファイルを監視
	gulp.watch(['./assets/edit_js/*.js'],['js_compress']); //jsファイルを監視
});

//　自動更新
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});

//htmlタスク
gulp.task('html',function(){
  gulp.src('./*.html')          //実行するファイル
    .pipe(plumber())
    .pipe(gulp.dest("./*.html"))
    .pipe(browser.reload({stream:true}))
});

gulp.task("js", function() {
    gulp.src(["./assets/js/*.js","!./assets/js/min/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./assets/js/min"))
        .pipe(browser.reload({stream:true}))
});
 
// sass compile
gulp.task("sass", function() {
    gulp.src("./assets/scss/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 6 versions', "ie 8"],
            cascade: false
        }))
        .pipe(gulp.dest("./assets/css"))
        .pipe(browser.reload({stream:true}))
});
 
gulp.task("default",['server'], function() {
    gulp.watch(["./assets/js/*.js","!./assets/js/min/*.js"],["js"]);
    gulp.watch("./assets/scss/*.scss",["sass"]);
});