const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

function css( done ) {

    src('src/scss/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') )

    done();
}

function cssbuild( ) {
    return src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe(purgecss({
            content: ['index.html', 'edit-entry.html', 'my-entries.html', 'new-entry.html', 'src/js/**/*']
        }))
        .pipe(dest('build/css'))

}

function js() {
    return src('src/js/**/*')
        .pipe( dest('build/js'))
}

function imagenes() {
    return src('src/img/**/*')
        .pipe( dest('build/img') )
}

function dev() {
    watch ( 'src/scss/**/*.scss', css)
    watch ( 'src/js/**/*.js', js)
    watch ( 'src/img/**/*', imagenes )
}

exports.css = css;
exports.dev = dev;
exports.build = cssbuild;
exports.default = series( imagenes, css, js, dev );