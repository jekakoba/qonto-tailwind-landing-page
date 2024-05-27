import pkg from 'gulp'
const { src, dest, series, parallel } = pkg
import fonter from 'gulp-fonter-fix'
import ttf2woff from 'gulp-ttf2woff' // Додана бібліотека для конвертації в WOFF
import ttf2woff2 from 'gulp-ttf2woff2'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'
import path from 'path'
import fs from 'fs'
import { gulpPaths } from "../../config.js"

const { readdir } = fs
const fontsDir = path.resolve(`src/fonts`)

export const devFonts = (done) => {
   otfToTtf()
   ttfToWoff2(gulpPaths.dist.fonts)
   woff2Copy(gulpPaths.dist.fonts)
   done()
}
export const prodFonts = (done) => {
   otfToTtf()
   ttfToWoff2(gulpPaths.build.fonts)
   woff2Copy(gulpPaths.build.fonts)
   done()
}

const otfToTtf = () => {
   // Create fonts directory if doesn't exist
   const fontsDir = path.resolve(`src/fonts`)
   if (!fs.existsSync(fontsDir)) {
      fs.mkdirSync(fontsDir)
   }

   // Read otf fonts in src/fonts and convert to woff and ttf formats
   return src(`${gulpPaths.src.fonts}*.otf`, { encoding: false })
      .pipe(plumber(
         notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(fonter({
         formats: ['woff', 'ttf']
      }))
      // Pipe converted fonts to src/fonts directory
      .pipe(dest(gulpPaths.src.fonts))
}
//========================================================================================================================================================

/**
 * Converts ttf fonts to woff2 fonts
 * @gulpTask ttfToWoff2
 * @function
 * @param {void} none - No param needed.
 * @return {object} gulp - Gulp object.
 */
const ttfToWoff2 = (processPath) => {
   // Read ttf fonts in src/fonts directory and convert to woff2 format
   return src(`${gulpPaths.src.fonts}*.ttf`, { encoding: false })
      .pipe(plumber(
         notify.onError({
            title: "FONTS",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(fonter({
         formats: ['woff', 'ttf']
      }))
      // Convert ttf fonts to woff2 format
      .pipe(ttf2woff2())
      // Pipe converted fonts to dist/fonts directory
      .pipe(dest(`${processPath}`))
}
//========================================================================================================================================================

const woff2Copy = (processPath) => {
   // Read woff2 fonts in src/fonts directory and copy to dist/fonts directory
   return src(`${gulpPaths.src.fonts}*.woff2`, { encoding: false })
      .pipe(plumber(
         notify.onError({
            title: "FONTS", // Notification title
            message: "Error: <%= error.message %>" // Notification message
         }))
      )
      .pipe(dest(`${processPath}`)) // Pipe converted fonts to dist/fonts directory
}

//========================================================================================================================================================

/**
 * Create fonts style file (fonts.scss) in src/scss/fonts directory
 * @gulpTask fontsStyle
 * @function
 * @param {void} none - No param needed.
 * @return {object} gulp - Gulp object.
 */
export const fontsStyle = () => {
   // Path to the fonts style file
   const fontsFile = `${gulpPaths.src.scss}fonts/fonts.scss`

   // Read fonts names in src/fonts directory
   readdir(gulpPaths.src.fonts, function (err, fontsFiles) {
      if (fontsFiles) {
         let fileContent = '' // Initialize variable for fonts style file content
         let newFileOnly
         // Loop through all font files in src/fonts directory
         for (var i = 0; i < fontsFiles.length; i++) {
            // Get file name without extension
            let fontFileName = fontsFiles[i].split(".")[0]
            // Check if this is a new font, to avoid duplicate font faces
            if (newFileOnly !== fontFileName) {
               // Get font name from file name
               // let fontName = fontFileName.replace(/[^a-zA-Z0-9]+/g, '')
               let fontName = fontFileName.split("-")[0]
               // Get font weight from file name
               let fontWeight = fontFileName.split("-")[1]
                  ? fontFileName.split("-")[1]
                  : fontFileName
               // Get font style from file name
               let fontStyle = fontFileName.includes("-Italic")
                  ? "italic"
                  : "normal"
               // Convert font weight to standard value
               if (
                  fontWeight.toLowerCase() === "thin" ||
                  fontWeight.toLowerCase() === "hairline"
               ) {
                  fontWeight = 100
               } else if (
                  fontWeight.toLowerCase() === "extralight" ||
                  fontWeight.toLowerCase() === "ultralight"
               ) {
                  fontWeight = 200
               } else if (fontWeight.toLowerCase() === "light") {
                  fontWeight = 300
               } else if (fontWeight.toLowerCase() === "medium") {
                  fontWeight = 500
               } else if (
                  fontWeight.toLowerCase() === "semibold" ||
                  fontWeight.toLowerCase() === "demibold"
               ) {
                  fontWeight = 600
               } else if (fontWeight.toLowerCase() === "bold") {
                  fontWeight = 700
               } else if (
                  fontWeight.toLowerCase() === "extrabold" ||
                  fontWeight.toLowerCase() === "ultrabold"
               ) {
                  fontWeight = 800
               } else if (
                  fontWeight.toLowerCase() === "black" ||
                  fontWeight.toLowerCase() === "heavy"
               ) {
                  fontWeight = 900
               } else if (
                  fontWeight.toLowerCase() === "extrablack" ||
                  fontWeight.toLowerCase() === "ultrablack"
               ) {
                  fontWeight = 950
               } else {
                  fontWeight = 400
               }
               // Add font face to the fonts style file content
               fileContent += `
/**
 * ${fontName} font face
 */
@font-face {
   font-family: ${fontName};
   font-display: swap;
   src: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");
   font-weight: ${fontWeight};
   font-style: ${fontStyle};
}

`
               newFileOnly = fontFileName
            }
         }
         // Write fonts style file content to the file
         fs.writeFile(fontsFile, fileContent, cb)
      }
   })
   // Return streams
   return src(`${gulpPaths.src.base}`)
}
//========================================================================================================================================================

function cb() { }


