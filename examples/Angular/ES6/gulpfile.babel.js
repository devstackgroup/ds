import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import vinylSourceStream from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import gulpLoadPlugins from 'gulp-load-plugins';

var plugins = gulpLoadPlugins();

const src = {
	html: 'src/**/*.html',
	js: {
		all: 'src/js/**/*.js',
		app: 'src/js/app.js'
	},
  dest: 'dist'
};

const out = {
	js: {
		file: 'app.min.js',
		folder: `${src.dest}/js/`
	}
};

gulp.task('html', () => {
	return gulp.src(src.html)
		.pipe(gulp.dest(src.dest))
		.pipe(plugins.connect.reload());
});

gulp.task('jshint', () => {
	return gulp.src(src.js.all)
		.pipe(plugins.jshint({
			esnext: true
		}))
		.pipe(plugins.jshint.reporter('jshint-stylish'));
});


gulp.task('scripts', ['jshint'], () => {
	var sources = browserify({
		entries: src.js.app,
		debug: true
	})
	.transform(babelify.configure({
		/* https://babeljs.io/docs/usage/options/ */
	}));

	return sources.bundle()
		.pipe(vinylSourceStream(out.js.file))
		.pipe(vinylBuffer())
		.pipe(plugins.sourcemaps.init({
			loadMaps: true
		}))
		.pipe(plugins.ngAnnotate())
		.pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write('./', {
			includeContent: true
		}))
		.pipe(gulp.dest(out.js.folder))
		.pipe(plugins.connect.reload());
});

gulp.task('serve', ['build', 'watch'], () => {
	plugins.connect.server({
		root: `${src.dest}/`,
		port: 3333,
		livereload: true,
		fallback: `${src.dest}/index.html`
	});
});

gulp.task('watch', () => {
	gulp.watch(src.html, ['html']);
	gulp.watch(src.js.all, ['scripts']);
});

gulp.task('build', ['scripts', 'html']);
gulp.task('default', ['serve']);
