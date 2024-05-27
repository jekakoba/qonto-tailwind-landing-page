import Typed from 'typed.js'

function createTyped(wrapper, renderString) {
   const typed = new Typed(wrapper, {
      stringsElement: renderString,

      /**
      * @property {number} typeSpeed type speed in milliseconds
      */
      typeSpeed: 30,

      /**
       * @property {number} startDelay time before typing starts in milliseconds
       */
      startDelay: 0,

      /**
       * @property {number} backSpeed backspacing speed in milliseconds
       */
      backSpeed: 10,

      /**
       * @property {boolean} smartBackspace only backspace what doesn't match the previous string
       */
      smartBackspace: true,

      /**
       * @property {boolean} shuffle shuffle the strings
       */
      shuffle: false,

      /**
       * @property {number} backDelay time before backspacing in milliseconds
       */
      backDelay: 700,

      /**
       * @property {boolean} fadeOut Fade out instead of backspace
       * @property {string} fadeOutClass css class for fade animation
       * @property {boolean} fadeOutDelay Fade out delay in milliseconds
       */
      fadeOut: false,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,

      /**
       * @property {boolean} loop loop strings
       * @property {number} loopCount amount of loops
       */
      loop: true,
      loopCount: Infinity,

      /**
       * @property {boolean} showCursor show cursor
       * @property {string} cursorChar character for cursor
       * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
       */
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
   })
}

createTyped('#typed', '#typed-strings')
