var gulp = require('gulp');
var gulputil = require('gulp-util');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var minify = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

var jade = require('gulp-jade')
/*
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');*/

// Jadeビルドタスク
gulp.task('jade', function () {
  gulp.src(['./jade/*.jade', '!./jade/temp_*.jade'])
    .pipe(jade({pretty:true}))
    .pipe(gulp.dest('./'))
});

// Sass(SCSS)ビルドタスク
gulp.task('sass', function () { 
    // Sass(SCSS)読み込み用ディレクトリ指定
    gulp.src('./assets/scss/*.scss')
    //エラー時再起させる
    .pipe(plumber())
    //コンパイルメソッド実行 
    .pipe(sass())
	//prefixer
	.pipe(autoprefixer({
		browsers: ['last 1 versions', "ie 9"],
		cascade: false
    }))
	//minify
	.pipe(minify({}))
    //コンパイル後出力ファイル先の指定
    .pipe(gulp.dest('./assets/css')); 
});

//htmlタスク
gulp.task('html',function(){
  gulp.src('./*.html')          //実行するファイル
    .pipe(connect.reload());    //ブラウザの更新
});

// JavaScirpt ミニファイ
gulp.task('js_compress', function() {
  gulp.src('./assets/edit_js/*.js')
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('./assets/js'))
});
 
//ファイルの監視
gulp.task('watch',function(){
  gulp.watch(['./*.html'],['html']);    //htmlファイルを監視
  gulp.watch(['./assets/scss/*.scss'],['sass']); //scssファイルを監視
  gulp.watch(['./assets/css/*.css'],['html']); //cssファイルを監視
  gulp.watch(['./assets/edit_js/*.js'],['js_compress']); //jsファイルを監視
  gulp.watch(['./jade/*.jade'],['jade']); //jsファイルを監視
});

//ローカルサーバー
gulp.task('connectDev',function(){
  connect.server({
    root: ['./'],   //ルートディレクトリ
    port: 8000,     //ポート番号
    livereload: true
  });
});

//画像軽量化
/*gulp.task('imagemin', function () {
    gulp.src(['./assets/img/*.{png,jpg,gif}'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./assets/img/'));
});*/



gulp.task('default',['sass', 'connectDev', 'watch', 'js_compress', 'jade']);