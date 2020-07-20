module.exports = (gulp, tools) => {
	return function () {

		// tools.browserSync.init({
		// 	ui: false,
		// 	notify: false,
		// 	logLevel: 'debug',
		// 	open: false,
		// 	proxy: 'http://test7.9111.ru',
		// 	host: 'test7.9111.ru',
		// })

		tools.browserSync.init({
			server: "./",
			ui: false,
			notify: false,
			logLevel: 'debug',
			// reloadOnRestart: false,
			open: false
		})

	}
}
