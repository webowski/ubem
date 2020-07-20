import { query, queryAll } from '../helpers/Common'
import Glide from '@glidejs/glide'


// Glide slider
// ========================
let glideSimple = [];

queryAll('.Glide').forEach( (glide, i) => {

	glideSimple[i] = new Glide(glide, {
		autoplay:            glide.dataset.autoplay || false,
		rewind:              glide.dataset.rewind || true,
		animationDuration:   glide.dataset.duration || 300,
		animationTimingFunc: 'linear',
		touchRatio:          1,
		rewindDuration:      glide.dataset.rewindDuration || 500,
		classes: {
			direction: {
				ltr: 'Glide--ltr',
				rtl: 'Glide--rtl'
			},
			slider: 'Glide--slider',
			carousel: 'Glide--carousel',
			swipeable: 'is-swipeable',
			dragging: 'is-dragging',
			cloneSlide: 'is-clone',
			activeNav: 'is-active',
			activeSlide: 'is-active',
			disabledArrow: 'is-disabled'
		},
	}).mount()
})
