module.exports = (gulp, tools) => {

	const uglifyify = require('uglifyify');

	// make a destination folder
	const makeDest = vinyl => {

		vinyl.path = tools.path.relative(vinyl.cwd, vinyl.path)

		let file = {
			name:    tools.path.parse(vinyl.path).name,
			ext:     tools.path.parse(vinyl.path).ext,
			dir:     tools.path.dirname(vinyl.path)
		}

		let beginningsToRemove = tools.config.scripts.beginningsToRemove

		beginningsToRemove.forEach(function(part) {
			let regexp = new RegExp('^' + part)
			file.dir = file.dir.replace(regexp, '')
		})

		file.dest = './scripts/min/' + file.dir + '/'

		tools.fs.mkdirsSync( file.dest )

		return file.dest
	}


	return () => {

		let scripts = tools.config.scripts

		let streamScripts = gulp.src(scripts.separate, {
				cwd: './',
				nosort: true,
			})
			.pipe(tools.uglify({
				output: {
					comments: false,
				}
			}))
			.on('error', () => {
				console.log.bind(console, '\007')
			})
			.pipe(tools.through.obj( (vinyl, encoding, callback) => {

				// переделать
				let dest = makeDest(vinyl)
				let scriptsPath = dest + vinyl.relative
				let content = vinyl.contents.toString(encoding)

				tools.fs.outputFileSync( scriptsPath, content, err => {
					console.log( err );
				})

				callback(null, vinyl);
			}))
			// .pipe(gulp.dest('./scripts/min/'))

		// let streamScriptsConcat = gulp.src(scripts.concat, {
		// 		cwd: './',
		// 		nosort: true,
		// 		allowEmpty: true,
		// 	})
		// 	.pipe(tools.through.obj( (vinyl, encoding, callback) => {

		// 		console.log( vinyl.basename );

		// 		// vinyl = prependScss(vinyl);

		// 		// vinyl.path = tools.path.relative(vinyl.cwd, vinyl.path)

		// 		// console.dir( vinyl.path );

		// 		// var vinylNew = tools.browserify([
		// 		// 	// './scripts/common.js',
		// 		// 	'./' + vinyl.path
		// 		// ])
		// 		// .transform(tools.babelify.configure({
		// 		// 	presets: [
		// 		// 		[
		// 		// 			'@babel/preset-env',
		// 		// 			{
		// 		// 				"targets": {
		// 		// 					"ie": "11",
		// 		// 					// "esmodules": true,
		// 		// 				},
		// 		// 				"corejs": "^3.6.4",
		// 		// 				"useBuiltIns": "usage",
		// 		// 				// "modules": "commonjs",
		// 		// 			}
		// 		// 		],
		// 		// 	],
		// 		// 	// tools: ['transform-runtime']
		// 		// 	// babel/preset-flow
		// 		// }))
		// 		// .bundle()
		// 		// // .pipe(tools.source(vinyl.basename))
		// 		// .pipe(tools.buffer())
		// 		// // .pipe(tools.streamify(
		// 		// // 	tools.concat('common.js'))
		// 		// // )
		// 		// // .pipe(tools.streamify(tools.uglify({
		// 		// // 	output: {
		// 		// // 		comments: false,
		// 		// // 	}
		// 		// // })))
		// 		// // .pipe(tools.uglify({
		// 		// // 	output: {
		// 		// // 		comments: false,
		// 		// // 	}
		// 		// // }))
		// 		// // .pipe(gulp.dest('./scripts/min/'))

		// 		// // console.dir( vinyl );

		// 		callback(null, vinyl);
		// 	}))
		// 	.pipe(tools.concat('common.conc.js'))
		// 	// .pipe(tools.source('common.js'))
		// 	.pipe(gulp.dest('./scripts/min/'))
		// 	// .pipe(tools.browserSync.stream())
		// 	// .pipe(buffer())     // to continue using the stream


		var streamBrowserify = tools.browserify({ entries: ['scripts/common.js'] })
				.transform(tools.babelify.configure({
					presets: [
						[
							'@babel/preset-env',
							{
								"targets": {
									"ie": "11",
									// "esmodules": true,
								},
								"corejs": "^3.6.4",
								"useBuiltIns": "usage",
								// "modules": "commonjs",
							}
						],
					],
					// tools: ['transform-runtime']
					// babel/preset-flow
				})
			)
			.bundle()
			.pipe(tools.source('common.js'))
			.pipe(gulp.src('./scripts/components/editor.js'))
			.pipe(tools.through.obj( (vinyl, encoding, callback) => {

				console.dir( vinyl.path );
				callback(null, vinyl);
			}))
			.pipe(tools.streamify(tools.uglify({
				output: {
					comments: false,
				}
			})))
			.pipe(gulp.dest('./scripts/min'));

		// console.log( streamBrowserify );


		// return tools.browserify([
		// 		'./scripts/app.js',
		// 	])
		// 	.transform(tools.babelify.configure({
		// 		presets: [
		// 			[
		// 				'@babel/preset-env',
		// 				{
		// 					"targets": {
		// 						"ie": "11",
		// 						// "esmodules": true,
		// 					},
		// 					"corejs": "^3.6.4",
		// 					"useBuiltIns": "usage",
		// 					// "modules": "commonjs",
		// 				}
		// 			],
		// 		],
		// 		// tools: ['transform-runtime']
		// 		// babel/preset-flow
		// 	}))
		// 	.bundle()
		// 	.pipe(tools.source('app.min.js'))
		// 	.pipe(tools.streamify(tools.uglify({
		// 		output: {
		// 			comments: false,
		// 		}
		// 	})))
		// 	.pipe(gulp.dest('./scripts/'))
		// 	.pipe(tools.browserSync.stream())
		// 	// .pipe(buffer())     // to continue using the stream

		return tools.merge( streamScripts, streamBrowserify )

	}
}
