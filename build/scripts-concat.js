// Scripts
gulp.task('scripts:concat', () => {

	// Head scripts
	gulp.src([
			'./js/js.js',
			'./js/regions.js',
			'./js/urist/urists.js',
		])
		.pipe(concat('head-scripts.min.js'))
		.pipe(uglify({
			output: {
				comments: false,
			}
		}))
		.on('error', console.log.bind(console, '\007'))
		.pipe(gulp.dest('./scripts/'))

	// Head scripts 2
	gulp.src([
			'./js/forum/forum.js',
			'./js/voting.js',
		])
		.pipe(concat('head-scripts-2.min.js'))
		.pipe(uglify({
			output: {
				comments: false,
			}
		}))
		.on('error', console.log.bind(console, '\007'))
		.pipe(gulp.dest('./scripts/'))

	// Footer scripts, before </body>
	return gulp.src([
			'./js/utils/uploader.js',
			'./node_modules/glider-js/glider.min.js',
			'./scripts/lib/autocomplete1.0.4/auto-complete.min.js',
			'./scripts/lib/fancybox-3.2.5/jquery.fancybox.min.js',
			'./scripts/lib/mustache/mustache2.3.0.min.js',
			'./js/chat/chat_modal.js',
			'./js/forum/editor.js',
			'./js/header/header.js',
			'./js/common.js',
		])
		.pipe(concat('footer-scripts.min.js'))
		.pipe(uglify({
			output: {
				comments: false,
			}
		}))
		.on('error', console.log.bind(console, '\007'))
		.pipe(gulp.dest('./scripts/'))
		.pipe(browserSync.stream())
})
