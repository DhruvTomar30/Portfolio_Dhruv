// Node.js Packages / Dependencies
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import concat from 'gulp-concat';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import pngQuant from 'imagemin-pngquant';
import browserSyncLib from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import jpgRecompress from 'imagemin-jpeg-recompress';
import clean from 'gulp-clean';
import sassCompiler from 'sass';
import replace from 'gulp-replace';

const isNetlify = process.env.NETLIFY;

// Initialize BrowserSync and Sass
const browserSync = browserSyncLib.create();
const sass = gulpSass(sassCompiler);

// Paths
const paths = {
    root: { www: './public_html' },
    src: {
        root: 'public_html/assets',
        html: 'public_html/**/*.html',
        css: 'public_html/assets/css/*.css',
        js: 'public_html/assets/js/*.js',
        vendors: 'public_html/assets/vendors/**/*.*',
        imgs: 'public_html/assets/imgs/**/*.+(png|jpg|gif|svg)',
        scss: 'public_html/assets/scss/**/*.scss',
        json: [
            'public_html/*.json',
            'public_html/projects/*.json'
        ],
        misc: [
            'public_html/projects/**/*.*',
            '!public_html/projects/**/*.html' // handled separately in htmlTask
        ]
    },
    dist: {
        root: 'public_html/dist',
        css: 'public_html/dist/css',
        js: 'public_html/dist/js',
        imgs: 'public_html/dist/imgs',
        vendors: 'public_html/dist/vendors'
    }
};

// Compile SCSS to CSS
export function sassTask() {
    return gulp.src(paths.src.scss)
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest(paths.src.root + '/css'))
        .pipe(browserSync.stream());
}

// Minify + Combine CSS (dhruv.css + responsive.css)
export function cssTask() {
    return gulp.src([
        'public_html/assets/css/dhruv.css',
        'public_html/assets/css/responsive.css'
    ])
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(concat('dhruv.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist.css));
}

// Minify + Combine JS
export function jsTask() {
    return gulp.src(paths.src.js)
        .pipe(uglify())
        .pipe(concat('dhruv.js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.dist.js));
}

// Optimize Images
export function imagesTask() {
    return gulp.src(paths.src.imgs)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            pngQuant(),
            jpgRecompress()
        ]))
        .pipe(gulp.dest(paths.dist.imgs));
}

// Copy Vendors
export function vendorsTask() {
    return gulp.src(paths.src.vendors)
        .pipe(gulp.dest(paths.dist.vendors));
}

// Copy HTML files (preserve subfolders like /projects/)
export function htmlTask() {
    return gulp.src(paths.src.html, { base: 'public_html' })
        .pipe(replace('assets/css/dhruv.css', 'css/dhruv.min.css'))
        .pipe(replace('assets/css/responsive.css', '')) // merged into dhruv.min.css
        .pipe(replace('assets/js/dhruv.js', 'js/dhruv.min.js'))
        .pipe(gulp.dest(paths.dist.root));
}

// Copy JSON files to dist (e.g. skills.json, projects.json)
export function jsonTask() {
    return gulp.src(paths.src.json, { base: 'public_html' })
        .pipe(gulp.dest(paths.dist.root));
}

// Copy all other assets like project scripts, styles, etc.
export function miscFilesTask() {
    return gulp.src(paths.src.misc, { base: 'public_html' })
        .pipe(gulp.dest(paths.dist.root));
}

// Clean dist folder
export function cleanDistTask() {
    return gulp.src(paths.dist.root, { allowEmpty: true, read: false })
        .pipe(clean());
}

// Serve with live-reload for development
export function serveTask(cb) {
    if (isNetlify) {
        console.log('Skipping serveTask on Netlify.');
        cb();
        return;
    }

    browserSync.init({
        server: {
            baseDir: paths.root.www
        },
        port: 3000
    });

    gulp.watch(paths.src.scss, sassTask);
    gulp.watch(paths.src.css, cssTask).on('change', browserSync.reload);
    gulp.watch(paths.src.js, jsTask).on('change', browserSync.reload);
    gulp.watch(paths.src.html, htmlTask).on('change', browserSync.reload);

    cb();
}

// Full Build Task
export const build = gulp.series(
    cleanDistTask,
    gulp.parallel(
        sassTask,
        cssTask,
        jsTask,
        imagesTask,
        vendorsTask,
        htmlTask,
        jsonTask,
        miscFilesTask
    )
);

// Default Task
const defaultTask = isNetlify ? build : gulp.series(build, serveTask);
export default defaultTask;
