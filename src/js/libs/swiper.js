/*
Slider Documentation: https://swiperjs.com/
*/
import Swiper from 'swiper'

// Base styles ====================================================================================

// import '../../scss/libs/swiper-base.scss'

// Modules: =======================================================================================
// Navigation, Pagination, Autoplay, EffectFade, Lazy, Manipulation

import { Navigation, Autoplay } from 'swiper/modules'

//=================================================================================================

function initSliders() {
   //==============================================================================================
   // Creating sliders
   //==============================================================================================
   if (document.querySelector('.swiper')) {
      const swiper = new Swiper(".swiper", {
         modules: [Navigation, Autoplay],
         spaceBetween: 30,
         loop: true,
         speed: 800,
         autoplay: {
            delay: 3500,
            disableOnInteraction: false,
         },
         navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
         },

         // Events
         on: {

         }
      })
   }
   //==============================================================================================
}

// Initialization of sliders

window.addEventListener("load", function (e) {
   initSliders()
})