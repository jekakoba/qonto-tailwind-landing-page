class TextWrapper {
   /**
    * @param {string} selector - CSS selector for the elements to wrap
    * @param {string} tag - Name of the HTML tag that will wrap the text
    * @param {string} method - The method of wrapping: letter, word or all
    * @param {string} className - Class name for the wrapper tag
    */
   constructor(selector, tag, method, className) {
      this.selector = selector
      this.tag = tag
      this.method = method
      this.className = className
   }

   /**
    * Wraps the text content of the elements with the specified selector
    */
   wrapText() {
      document.querySelectorAll(this.selector).forEach((element) => {
         const text = element.textContent
         const wrappedText = this[`wrap${this.method.charAt(0).toUpperCase()}${this.method.slice(1)}`](text)
         element.innerHTML = wrappedText
      })
   }

   /**
    * Wraps each letter of the text with the specified tag and class
    * @param {string} text - The text to wrap
    * @returns {string} - The wrapped text
    */
   wrapLetter(text) {
      return text.split('').map((letter) => {
         return `<${this.tag} class="${this.className}--letter">${letter}</${this.tag}>`
      }).join('')
   }

   /**
    * Wraps each word of the text with the specified tag and class
    * @param {string} text - The text to wrap
    * @returns {string} - The wrapped text
    */
   wrapWord(text) {
      return text.split(' ').map((word) => {
         return `<${this.tag} class="${this.className}--word">${word}</${this.tag}>`
      }).join(' ')
   }

   /**
    * Wraps each letter of each word of the text with the specified tag and class
    * @param {string} text - The text to wrap
    * @returns {string} - The wrapped text
    */
   wrapAll(text) {
      return text.split(' ').map((word) => {
         const wrappedWord = word.split('').map((letter) => {
            return `<${this.tag} class="${this.className}--letter">${letter}</${this.tag}>`
         }).join('')

         return `<${this.tag} class="${this.className}--word">${wrappedWord}</${this.tag}>`
      }).join(' ')
   }

}


const wrapper = new TextWrapper('.my-element', 'span', 'all', 'my-class').wrapText();

