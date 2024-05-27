import { menuClose, logger } from "../functions/functions.js"

// ===============================================
// Connecting a complement to increase the capabilities
// Documentation: https://github.com/cferdinandi/smooth-scroll
// import SmoothScroll from 'smooth-scroll'

// ===============================================

// The module of smooth proract to the block
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock)
	if (targetBlockElement) {
		let headerItem = ''
		let headerItemHeight = 0
		if (noHeader) {
			headerItem = 'header'
			const headerElement = document.querySelector(headerItem)
			if (!headerElement.classList.contains('_header-scroll')) {
				headerElement.style.cssText = `transition-duration: 0s;`
				headerElement.classList.add('_header-scroll')
				headerItemHeight = headerElement.offsetHeight
				headerElement.classList.remove('_header-scroll')
				setTimeout(() => {
					headerElement.style.cssText = ``
				}, 0)
			} else {
				headerItemHeight = headerElement.offsetHeight
			}
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		}
		// close the menu if it is open
		document.documentElement.classList.contains("menu-open") ? menuClose() : null

		if (typeof SmoothScroll !== 'undefined') {
			// Scrolling using a supplement
			new SmoothScroll().animateScroll(targetBlockElement, '', options)
		} else {
			// Scrolling with standard means
			let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			})
		}
		logger(`'rocket', [gotoBlock]: We go to ${targetBlock}`)
	} else {
		logger(`'alarm', [gotoBlock]: There is no such block on the page ${targetBlock}`)
	}
}
