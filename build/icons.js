module.exports = (gulp, tools) => {
	return function () {

		return gulp.src('./images/vector-icons/*.svg')
			// minify svg
			.pipe(tools.svgmin({ js2svg: { pretty: true } }))
			// replace spaces with hyphens, get rid of the "-icon" postfix
			.pipe(tools.rename(function (path) {
				path.basename = path.basename
					.replace(/\s/g, '-')
					.replace(/-icon/, '');
			}))
			.pipe(tools.svgSprite({
				mode: {
					symbol: {
						dest: '',
						example: true,
						sprite: 'vector-icons.min.svg'
					},
					inline: false
				}
			}))
			.pipe(gulp.dest('./images/'))
			.pipe(tools.browserSync.reload({stream: true}));

	}
}
