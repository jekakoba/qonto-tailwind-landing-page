import * as TF from "../functions/functions.js"

// DOCS ============================================================================================
// Object Observer
// data-watch - can write values for using a custom code
// data-watch-root - Parental element within which to observe the object
// data-watch-margin - retreat
// data-watch-threshold - The percentage of the object shows to work
// data-watch-once - observe only once
// _watcher-view - Class which is added for the appearance of an object
// =================================================================================================

class ScrollWatcher {
	constructor(props) {
		let defaultConfig = {
			logging: true,
		}
		this.config = Object.assign(defaultConfig, props)
		this.observer
		!document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null
	}
	// We update the constructor
	scrollWatcherUpdate() {
		this.scrollWatcherRun()
	}
	// We start the constructor
	scrollWatcherRun() {
		document.documentElement.classList.add('watcher')
		this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'))
	}
	// Observer designer
	scrollWatcherConstructor(items) {
		if (items.length) {
			this.scrollWatcherLogging(`Прокинувся, стежу за об'єктами (${items.length})...`)
			// We unite the parameters
			let uniqParams = uniqArray(Array.from(items).map(function (item) {
				return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`
			}))
			// We get object groups with the same parameters,
			// We create settings, initializing the observer
			uniqParams.forEach(uniqParam => {
				let uniqParamArray = uniqParam.split('|')
				let paramsWatch = {
					root: uniqParamArray[0],
					margin: uniqParamArray[1],
					threshold: uniqParamArray[2]
				}
				let groupItems = Array.from(items).filter(function (item) {
					let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null
					let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px'
					let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0
					if (
						String(watchRoot) === paramsWatch.root &&
						String(watchMargin) === paramsWatch.margin &&
						String(watchThreshold) === paramsWatch.threshold
					) {
						return item
					}
				})

				let configWatcher = this.getScrollWatcherConfig(paramsWatch)

				// Observer initialization with their settings
				this.scrollWatcherInit(groupItems, configWatcher)
			})
		} else {
			this.scrollWatcherLogging("Сплю, немає об'єктів для стеження. ZzzZZzz")
		}
	}
	// The settings function
	getScrollWatcherConfig(paramsWatch) {
		// Create settings
		let configWatcher = {}
		// The father in which the observation is conducted
		if (document.querySelector(paramsWatch.root)) {
			configWatcher.root = document.querySelector(paramsWatch.root)
		} else if (paramsWatch.root !== 'null') {
			this.scrollWatcherLogging(`Эмм... батьківського об'єкта ${paramsWatch.root} немає на сторінці`)
		}
		//Retreating
		configWatcher.rootMargin = paramsWatch.margin
		if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
			this.scrollWatcherLogging(`йой, налаштування data-watch-margin потрібно задавати в PX або %`)
			return
		}
		//Turning points
		if (paramsWatch.threshold === 'prx') {
			// parallax mode
			paramsWatch.threshold = []
			for (let i = 0; i <= 1.0; i += 0.005) {
				paramsWatch.threshold.push(i)
			}
		} else {
			paramsWatch.threshold = paramsWatch.threshold.split(',')
		}
		configWatcher.threshold = paramsWatch.threshold

		return configWatcher
	}
	// The function of creating a new observer with their settings
	scrollWatcherCreate(configWatcher) {
		this.observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				this.scrollWatcherCallback(entry, observer)
			})
		}, configWatcher)
	}
	//Observer initialization function with their settings
	scrollWatcherInit(items, configWatcher) {
		// creating a new observer with their settings
		this.scrollWatcherCreate(configWatcher)
		// Transfer to the observer of elements
		items.forEach(item => this.observer.observe(item))
	}
	//Function of Basic Actions Processing Points
	scrollWatcherIntersecting(entry, targetElement) {
		if (entry.isIntersecting) {
			// We see an object
			// add the class
			!targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null
			this.scrollWatcherLogging(`i see ${targetElement.classList}, added class _watcher-view`, 'success')
		} else {
			// We don't see an object
			// We pick up the class
			targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null
			this.scrollWatcherLogging(`i do not see ${targetElement.classList}, cleaned the class _watcher-view`, 'error')
		}
	}
	// Function of shutdown by object
	scrollWatcherOff(targetElement, observer) {
		observer.unobserve(targetElement)
		this.scrollWatcherLogging(`i stopped following ${targetElement.classList}`, 'info')
	}
	// The function of output to the console
	scrollWatcherLogging(message, type) {
		TF.logger(`[Watcher]: ${message}`, type)
	}
	// Observation processing function
	scrollWatcherCallback(entry, observer) {
		const targetElement = entry.target
		// Treatment of basic actions of works points
		this.scrollWatcherIntersecting(entry, targetElement)
		// If there is an attribute of Data-Watch-end we remove the tracking
		targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null
		// We create our feedback event
		document.dispatchEvent(new CustomEvent("watcherCallback", {
			detail: {
				entry: entry
			}
		}))
	}
}
// Start watcher
const watcher = new ScrollWatcher({})
