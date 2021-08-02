
const {src, dest, parallel, series, watch} = require('gulp');
const browserSync  = require('browser-sync').create();
const concat       = require('gulp-concat');
const uglify       = require('gulp-uglify-es').default;
const sass         = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const imagemin     = require('gulp-imagemin');
const newer        = require('gulp-newer');
const del          = require('del');
const gulpPug      = require('gulp-pug');

//обязательный парамет сеть
function browsersync() {
    browserSync.init({
        server:{baseDir:'dist/'},
        notyfy: false,
        online: true
        //false - локально

    })
}

function scripts() {
    return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.js',
    'source/js/script.js'
    ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream())
}

function styles() {
    return src('source/sass/style.scss')
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({overrideBrowserslist:['last 10 versions'], grid: true}))
    .pipe(cleanCSS(( { level: { 1: { specialComments: 0 } } } )))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream())

}

function images() {
    return src('source/images/src/**/*')
    .pipe(newer('dist/img/'))
    .pipe(imagemin())
    .pipe(dest('dist/img/'))
}

function cleanimg() {
    return del('dist/img/**/*', {force: true })
}

function cleandbackup() {
    return del('backup/**/*', {force: true })
}

function buildcopy() {
    return src(['css/**/*.min.css',
                'dist/js/**/*.min.js',
                'dist/img/**/*',
                'dist/**/*.html',
                ], 
                {base:'dist'})
    .pipe(dest('backup'))
}

/*****/

function pug () {
    return src('./views/**/*.pug')
    .pipe(gulpPug({
        pretty: true
    }))
    .pipe(dest('dist'))
}

/******** */


function startwatch() {
    watch('source/**/*.scss', styles);
    watch(['source/**/*.js','!source/**/*.min.js'],scripts);
    watch('dist/**/*.html').on('change', browserSync.reload);
    watch('source/images/src/**/*', images);
    watch('views/**/*.pug', pug);
}

exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.styles      = styles;
exports.images      = images;
exports.cleanimg    = cleanimg;
exports.pug         = pug;
exports.build       = series(cleandbackup, styles, scripts, images, buildcopy);

exports.default     = parallel(styles, scripts, browsersync, pug, startwatch);

