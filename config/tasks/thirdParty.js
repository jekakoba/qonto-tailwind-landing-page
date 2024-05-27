import pkg from 'gulp'
const { src, dest } = pkg
import newer from 'gulp-newer'
import { gulpPaths } from "../../config.js"

//========================================================================================================================================================

/**
 * Copy third-party libraries from source to dist.
 *
 * This task copies third-party libraries from the source folder to the dist
 * folder. It is used to ensure that all third-party libraries are copied to
 * the dist folder regardless of whether they are referenced in the HTML.
 *
 * @param {string} processPath - The path where the files will be processed.
 * @returns {Object} - gulp stream
 */

export const devThirdParty = (done) => {
   thirdParty(`${gulpPaths.dist.files}`)
   done()
}

export const prodThirdParty = (done) => {
   thirdParty(gulpPaths.build.files)
   done()
}

function thirdParty(processPath) {
   // Copy third-party libraries from source to dist
   return src(gulpPaths.src.files, { encoding: false })
      .pipe(newer(processPath))
      // Copy files to dist
      .pipe(dest(processPath))
}
