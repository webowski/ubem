module.exports = () => {

	return {

		styles: {
			separate: [
				'node_modules/@glidejs/glide/src/assets/sass/glide.core.scss',
				'node_modules/basiclightbox/src/styles/main.scss',
				// 'styles/specific/settings.scss',
				'styles/specific/test.css',
			],
			// will processed with concatenating to `styles/min/common.css`
			concat: [
				'node_modules/@glidejs/glide/src/assets/sass/glide.core.scss',
				'styles/specific/test.css',
				'styles/common.scss',
			],
			beginningsToRemove: [
				'node_modules/',
				'styles/',
			],
			// prepend @imports for overriding scss variables of separate components
			prependImports: [
				'styles/base/_variables.scss',
				'styles/base/_mixins.scss',
				'styles/base/_mediaqueries.scss',
			],
		},

		scripts: {
			separate: [
				'node_modules/@glidejs/glide/dist/glide.min.js',
				'node_modules/basiclightbox/dist/basicLightbox.min.js',
				'scripts/components/editor.js',
				// 'scripts/pages/settings.js',
			],
			// will processed with concatenating to `scripts/min/common.js`
			concat: [
				'scripts/components/editor.js',
				'scripts/common.js', // ES6
			],
			beginningsToRemove: [
				'node_modules/',
				'scripts/',
			],
		}
	}

}
