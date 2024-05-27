import Slideout from 'slideout'

import "../../scss/libs/slideout.scss"

function menuSlide(params) {
   const { menu, panel, button } = params
   const openBtn = document.querySelector(button)
   const panelEl = document.querySelector(panel)
   const menuEl = document.querySelector(menu)
   if (!panelEl || !menuEl) return

   var slideout = new Slideout({
      'panel': panelEl,
      'menu': menuEl,
      'padding': 256,
      'tolerance': 70
   })

   if (openBtn) {
      openBtn.addEventListener('click', function () {
         slideout.toggle()
      })
   }

}


menuSlide({
   menu: '[data-menu-body]',
   panel: '[data-menu-panel]',
   button: '[data-menu-toggle]'
})