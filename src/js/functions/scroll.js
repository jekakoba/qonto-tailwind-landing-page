
import { getHash } from "./functions.js"
import { gotoBlock } from '../libs/gotoblock.js'

// A smooth navigation on the page
export const pageNavigation = () => {

   // DOCS ============================================================================================
   // data-goto - Specify the ID of the block
   // data-goto-header - take into account Header
   // data-goto-top - Unscrew on the specified size
   // data-goto-speed - speed (only an additional plugin is used)
   // =================================================================================================

   // We work when you click on the item
   document.addEventListener("click", pageNavigationAction)
   // If SCROLLWATCHER is connected, illuminate the current menu item
   document.addEventListener("watcherCallback", pageNavigationAction)
   // The main function
   function pageNavigationAction(e) {
      if (e.type === "click") {
         const targetElement = e.target
         if (targetElement.closest('[data-goto]')) {
            const gotoLink = targetElement.closest('[data-goto]')
            const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : ''
            const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false
            const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500
            const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0
            gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop)
            e.preventDefault()
         }
      } else if (e.type === "watcherCallback" && e.detail) {
         const entry = e.detail.entry
         const targetElement = entry.target
         // Navigation items, if the Navigator value is indicated, illuminate the current menu item
         if (targetElement.dataset.watch === 'navigator') {
            const navigatorActiveItem = document.querySelector(`[data-goto]._navigator-active`)
            let navigatorCurrentItem
            if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) {
               navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`)
            } else if (targetElement.classList.length) {
               for (let index = 0; index < targetElement.classList.length; index++) {
                  const element = targetElement.classList[index]
                  if (document.querySelector(`[data-goto=".${element}"]`)) {
                     navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`)
                     break
                  }
               }
            }
            if (entry.isIntersecting) {
               // We see an object
               navigatorCurrentItem ? navigatorCurrentItem.classList.add('_navigator-active') : null
            } else {
               // We do not see the object
               navigatorCurrentItem ? navigatorCurrentItem.classList.remove('_navigator-active') : null
            }
         }
      }
   }
   // Scrolling on the harshh
   if (getHash()) {
      let goToHash
      if (document.querySelector(`#${getHash()}`)) {
         goToHash = `#${getHash()}`
      } else if (document.querySelector(`.${getHash()}`)) {
         goToHash = `.${getHash()}`
      }
      goToHash ? gotoBlock(goToHash, true, 500, 20) : null
   }
}

pageNavigation()
