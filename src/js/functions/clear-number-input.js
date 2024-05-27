import * as TF from "./functions.js"
/**
 * Clears the input field from all characters except numbers
 * @param {string} selector - CSS selector for the input field
 */
function validateNumber(selector) {
   // Get all input fields that match the selector
   const inputFields = document.querySelectorAll(selector)
   // If there are input fields
   if (inputFields.length > 0) {
      // Add event listener to each input field
      inputFields.forEach(field => {
         /**
          * Event listener that clears the input field from all characters except numbers
          * @event input
          * @this {HTMLElement} - The input field itself
          */
         field.addEventListener('input', function () {
            /**
             * The value of the input field after filtering
             * @type {string}
             */
            this.value = this.value.replace(/[A-Za-zА-Яа-яЁё]/g, '')
         })
      })
   } else {
      TF.logger('No input fields found', 'warning')
   }
}
// To the desired Inuits Add attribute - data-clear-number
document.addEventListener('DOMContentLoaded', function () {
   validateNumber('[data-clear-number]')
})
