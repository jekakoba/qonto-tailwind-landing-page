
import Swiper from 'swiper'
// Modules: =======================================================================================
// Navigation, Pagination, Autoplay, EffectFade, Lazy, Manipulation

import { Navigation, Autoplay } from 'swiper/modules'
import '../../scss/libs/swiper-base.scss'

// ? Sliders ========================================================================================================================================================
function initSliders() {

}

// ? Sliders Resize ========================================================================================================================================================
function servicesSlider(sliderEl) {
	if (document.querySelector('.services-slider')) {
		return new Swiper('.services-slider', {
			// modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 2,
			spaceBetween: 30,
			speed: 800,
			// Кнопки "вліво/вправо"
			// navigation: {
			// 	prevEl: '.navigation-swiper__button_prev',
			// 	nextEl: '.navigation-swiper__button_next',
			// },
			// breakpoints: {
			// 	320: {
			// 		slidesPerView: 1,
			// 		spaceBetween: 20,

			// 	},
			// 	500: {
			// 		slidesPerView: 2,
			// 		spaceBetween: 15,

			// 	},
			// 	767.98: {
			// 		slidesPerView: 3,
			// 		spaceBetween: 20,

			// 	},
			// 	991.98: {

			// 	},

			// },
		})
	}

}
// ? Resize functions ========================================================================================================================================================

function changeSliders(sliderFunc, breakpoint) {
	let currentMode
	let sliderEl = null
	function handleResize() {
		let globalWindowWidth = document.documentElement.clientWidth
		if (globalWindowWidth <= breakpoint && currentMode !== 'mobile') {
			sliderInit()
			currentMode = 'mobile'
		} else if (globalWindowWidth > breakpoint && currentMode !== 'desktop') {
			removeSlider()
			currentMode = 'desktop'
		}
	}
	function sliderInit() {
		sliderEl = sliderFunc(sliderEl)
	}
	function removeSlider() {
		if (sliderEl && !sliderEl.isDestroyed) {
			sliderEl.destroy(true, true)
			sliderEl = null
		}
	}
	handleResize()
	window.addEventListener('resize', handleResize)
}
window.addEventListener("load", function (e) {
	initSliders()
	changeSliders(servicesSlider, 991.98)
})

