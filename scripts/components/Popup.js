import { query, queryAll } from '../helpers/Common'
import * as basicLightbox from 'basiclightbox'


// basicLightbox popup
// -----------------------
let popupOpeners = queryAll('.do-popupOpener')

popupOpeners.forEach( popupOpener => {

	let className = popupOpener.dataset.class || ''
	let content = query(popupOpener.dataset.content)

	if (popupOpener.dataset.src) {
		content = query(popupOpener.dataset.src)
	}

	let instance = basicLightbox.create( content, {
		className: className,
		onShow: instance => {
			// console.log('onShow')
		},
		onClose: instance => {
			// console.log('onClose')
		}
	})

	popupOpener.addEventListener('click', e => {
		e.preventDefault()
		instance.show()
	})
})

/*
{# <div class="mb-20">
	<button class="Btn Btn--brand do-popupOpener" data-content="#popupContent">basicLightbox</button>
</div>

<div id="popupContent">
	<iframe width="560" height="315" src="https://www.youtube.com/embed/Scxs7L0vhZ4" frameborder="0" allowfullscreen></iframe>
</div> #}
*/


// Lightbox
// -----------------------
const initLightbox = (link) => {
	let image = document.createElement('img')
	image.setAttribute('src', link.getAttribute('href'))

	let instance = basicLightbox.create( image.outerHTML )

	link.addEventListener('click', e => {
		e.preventDefault()
		instance.show()
	}, true)
}

const applyLightbox = (image) => {
	let link = document.createElement('a')
	link.setAttribute('href', image.getAttribute('src'))
	link.classList.add('do-lightbox')
	image.parentNode.insertBefore(link, image)
	link.appendChild(image)
	initLightbox(link)
}

// ArticleContent
queryAll('.ArticleContent img').forEach(image => {
	if (image.parentNode.tagName !== 'a') {
		applyLightbox(image)
	}
})
