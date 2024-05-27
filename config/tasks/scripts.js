import pkg from 'gulp'
const { src, dest } = pkg
import webpack from 'webpack-stream'
import { webpackDev } from '../webpack.config.dev.js'
import { webpackProd } from '../webpack.config.prod.js'
import { gulpPaths } from "../../config.js"

//========================================================================================================================================================

/**
 * Task: Build JavaScript (dev)
 * ----------------------------------------------------------------------------
 * Transpile and bundle JS using Webpack, in development mode.
 *
 * Gulp will look for all JS files in the source directory (defined in gulpPaths.src.js)
 * and their subdirectories, and pass them through Webpack to create a single
 * concatenated JS file that is saved to the destination directory (defined in
 * gulpPaths.dist.js).
 */
export function devScripts() {
   return src(`${gulpPaths.src.js}app.js`) // Globbing pattern to grab all JS files in src/js and their subdirectories
      .pipe(webpack({ config: webpackDev }))
      .pipe(dest(gulpPaths.dist.js)) // Save the resulting JS file to the destination directory
}
//========================================================================================================================================================

/**
 * Task: Build JavaScript (prod)
 * ----------------------------------------------------------------------------
 * Transpile and bundle JS using Webpack, in production mode with minification.
 *
 * Gulp will look for all JS files in the source directory (defined in gulpPaths.src.js)
 * and their subdirectories, and pass them through Webpack to create a single
 * minified JS file that is saved to the destination directory (defined in
 * gulpPaths.dist.js).
 */
export function prodScripts() {
   return src(`${gulpPaths.src.js}app.js`) // Globbing pattern to grab all JS files in src/js and their subdirectories
      .pipe(webpack({ config: webpackProd })) // Pass them through Webpack in production mode with minification
      .pipe(dest(`${gulpPaths.build.js}`)) // Save the resulting minified JS file to the destination directory
}
//========================================================================================================================================================
