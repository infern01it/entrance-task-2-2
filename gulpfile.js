var path           = require('path'),
		gulp           = require('gulp'),
		browserSync    = require('browser-sync'),
		notify         = require("gulp-notify"),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		imagemin       = require('gulp-imagemin'),
		svgmin         = require('gulp-svgmin'),
		sass           = require('gulp-sass'),
		cssbeautify    = require('gulp-cssbeautify'),
		snippets       = require('snippets');

gulp.task('browser-sync', function() {
	browserSync({ server: true, notify: false });
});

gulp.task('sass', function() {
	return gulp.src(['sass/**/*.+(sass|scss)','!sass/bootstrap/**/*.+(sass|scss)'])
		.pipe(sass({
				includePaths: snippets.includePaths
    	}).on("error", notify.onError()))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cssbeautify({indent: '	'}))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', ['sass', 'browser-sync'], function() {
	gulp.watch('sass/**/*.+(sass|scss)', ['sass']);
	gulp.watch('js/**/*.js', browserSync.reload);
	gulp.watch('**/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('img/**/*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('img-min'));
});

gulp.task('svgmin', function() {
	return gulp.src('img/**/*.svg')
		.pipe(cache(svgmin({
			plugins: [{
				cleanupAttrs: {
					newlines: false,
					trim: false,
					spaces: false
				}
			}, {
				removeDoctype: false
			}, {
				cleanupNumericValues: {
					floatPrecision: 2
				}
			}, {
				convertColors: {
					names2hex: false,
					rgb2hex: false
				}
			}]
		})))
		.pipe(gulp.dest('svg-min'));
});

gulp.task('default', ['watch']);