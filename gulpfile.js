var gulp = require('gulp');
var plugins = require('gulp-load-plugins');
var runSequence = require('run-sequence');
var through = require('through2');
var formatTpls = require('./tasks/tpl');
var browser = require('browser-sync');
var rollup = require('rollup').rollup;
var babel = require('rollup-plugin-babel');
var nodeResolve = require('rollup-plugin-node-resolve');
var commonjs = require('rollup-plugin-commonjs');

runSequence.use(gulp);

var browserSync = browser.create(); //实时刷新
var reload = browserSync.reload;
var replaceMapping = {};

//构建
gulp.task('default', function() {
    console.log('gulp启动了');
    gulp.run('build');
});

//编译sass
gulp.task('scss', function() {
    return gulp.src('assets/index.scss')
        .pipe(plugins().sass().on('error', plugins().sass.logError))
        .pipe(plugins().rev())
        .pipe(revStashMapping())
        .pipe(plugins().autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(plugins().minifyCss())
        .pipe(gulp.dest('dist/assets/styles'));
});

// 复制静态资源，字体，图片
gulp.task('assets', function() {
    gulp.src('assets/font/*')
        .pipe(gulp.dest('dist/assets/styles/font'));
    return gulp.src('assets/img/*')
        .pipe(gulp.dest('dist/assets/img'));
});

//将js文件打包
gulp.task('scripts', function() {
    return rollup({
        entry: 'app/main.js',
        plugins: [
            nodeResolve({
                jsnext: true
            }),
            commonjs(),
            babel()
        ]
    }).then(function(bundle) {
        return bundle.write({
            format: 'iife',
            dest: 'dist/assets/scripts/main.js'
        });
    });
});

//将js打包文件压缩并加hash值并替换html
gulp.task('minJs', ['scripts'],function() {
    return gulp.src('dist/assets/scripts/main.js')
        .pipe(plugins().rev())
        .pipe(revStashMapping())
        .pipe(plugins().uglify())
        .pipe(gulp.dest('dist/assets/scripts'))
});

//将tpl模板与文件名关联进一个js文件内
gulp.task('tpls', function() {
    return gulp.src('app/**/*.tpl.html')
        .pipe(formatTpls('templates.js'))
        .pipe(gulp.dest('app/tpl'));
});


// 清空构建目录
gulp.task('clean', function() {
    return gulp.src('dist/assets', {
            read: false
        })
        .pipe(plugins().rimraf());
});

//清除中间文件
gulp.task('deleteTmp', function() {
    return gulp.src('dist/assets/scripts/main.js', {
            read: false
        })
        .pipe(plugins().rimraf());
});

//替换html里面引入的css和js文件
gulp.task('replace', function() {
    return gulp.src('index.html')
        .pipe(plugins().replace('index.css', replaceMapping['index.css']))
        .pipe(plugins().replace('main.js', replaceMapping['main.js']))
        .pipe(gulp.dest('dist'));
});

//构建项目
gulp.task('build', function(done) {
    runSequence(
        'clean',
        'tpls', 
        ['scss', 'minJs', 'assets'],
        ['replace','deleteTmp'],
        done);
});

gulp.task('watch', function() {
    browserSync.init({
        proxy: "localhost:9001"
    });
    //使用gulp的监听功能，实现编译修改过后的文件
    gulp.watch('app/**/*', ['build'], function() {
        console.log("监听结束");
    });
    gulp.watch(('dist/index.html')).on('change', reload);
});

// 记录静态文件的hash
function revStashMapping() {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }
        var oldPath = file.history[file.history.length - 2];
        var oldName = oldPath.match(/[^\/]+$/g)[0];
        replaceMapping[oldName] = file.path.match(/[^\/]+$/g)[0];
        this.push(file);
        cb();
    });
}