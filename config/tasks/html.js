import pkg from 'gulp'
const { src, dest } = pkg
import versionNumber from "gulp-version-number"
import webphtml from 'gulp-webp-html-nosvg'
import fileinclude from 'gulp-file-include'
import { config, gulpPaths } from "../../config.js"
import { replaceAliasHTML } from "./replacePaths.js"

//========================================================================================================================================================

const versions = {
   'value': '%DT%',
   'append': {
      'key': 'v',
      'cover': 0,
      'to': ['css', 'js', 'img']
   },
   'output': {
      'file': '../version.json'
   }
}

/**
 * Produces the HTML file in dev mode.
 *
 * @return {object} The Gulp stream
 */
export function devHTML() {
   /*
   * Reads the source HTML file
   * Includes partials (header, footer, etc.)
   * Writes the resulting HTML file to the dist directory
   * */
   return src([`${gulpPaths.src.base}*.html`])
      .pipe(fileinclude({ ...config.include }))
      .pipe(replaceAliasHTML())
      .pipe(versionNumber({ ...versions }))
      .pipe(dest(gulpPaths.dist.base))
}

//========================================================================================================================================================

/**
 * Produces the HTML file with webp images in dist directory.
 *
 * @return {object} The Gulp stream
 */
export function prodHTML() {
   /*
    * Reads the source HTML file.
    * Includes partials (header, footer, etc.)
    * Converts the images to webp and injects them into the HTML
    * Writes the resulting HTML to the dist directory
    */
   return src(`${gulpPaths.src.base}*.html`)
      .pipe(fileinclude({ ...config.include }))
      .pipe(replaceAliasHTML())
      .pipe(webphtml())
      .pipe(versionNumber({ ...versions }))
      .pipe(dest(gulpPaths.build.base))
}
//========================================================================================================================================================

/**
 * Produces the HTML file without webp images in dist directory.
 *
 * This function is used for generating a version of the HTML file without
 * the webp images in case the user doesn't have a browser that supports webp.
 *
 * @return {object} The Gulp stream
 */
export function prodHTMLNoWebp() {
   /*
   * Reads the source HTML file.
   * Includes partials (header, footer, etc.)
   * Writes the resulting HTML file to the dist directory without webp images
   */
   return src(`${gulpPaths.src.base}*.html`)
      .pipe(fileinclude({ ...config.include }))
      .pipe(replaceAliasHTML())
      .pipe(dest(gulpPaths.build.base))  // write resulting HTML to dist
}
//========================================================================================================================================================