import * as TF from "../functions/functions.js"

import gsap from "gsap"
// Import modules
// import ScrollTrigger from "gsap/ScrollTrigger.js"
// import Flip from "gsap/Flip.js";
// import Draggable from "gsap/Draggable.js";
// import MotionPathPlugin from "gsap/MotionPathPlugin.js";

// Register modules
gsap.registerPlugin(
   // ScrollTrigger,
   // Draggable,
   // Flip,
   // MotionPathPlugin
)

// Start
const animEl = document.querySelector('.content-anim')
if (animEl) {
   gsap.fromTo(
      animEl,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power2.inOut" }
   )
} else {
   TF.logger('No animation element found', 'warning')
}

