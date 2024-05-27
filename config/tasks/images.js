import pkg from 'gulp'
const { src, dest } = pkg
import imagemin from "gulp-imagemin"
import webp from "gulp-webp"
import newer from 'gulp-newer'
import gulpPlumber from 'gulp-plumber'
import notify from 'gulp-notify'
import { config, gulpPaths } from "../../config.js"
//========================================================================================================================================================

/**
 * Copies new images from src to dist.
 * @returns {Object} - gulp stream
 */
export function devImages() {
   // Grab new images from the source folder
   // and copy them to the dist folder
   return src(gulpPaths.src.images, { encoding: false })
      // Only copy files that are newer than the dist version
      .pipe(newer(gulpPaths.dist.images))
      // Pipe the images to the dist folder
      .pipe(dest(gulpPaths.dist.images))
   // Return the stream
}
//========================================================================================================================================================

/**
 * Optimize images.
 *
 * This task optimizes images using gulp-imagemin. The options used are
 * defined in the config file.
 */
export const imageOptimize = () => {
   // Optimize images
   return src(gulpPaths.src.images, { encoding: false })
      .pipe(gulpPlumber(
         notify.onError({
            title: "IMAGE-OPTIMIZE",
            message: "Error: <%= error.message %>"
         })
      ))
      // Optimize images
      .pipe(imagemin({ ...config.imagemin }))
      // Copy optimized images to the dist folder
      .pipe(dest(gulpPaths.build.images))

}
//========================================================================================================================================================
/**
 * Generate WebP versions of images.
 *
 * This task generates WebP versions of images and optimizes them. The options
 * used are defined in the config file. The optimized images are copied to the
 * dist folder.
 */
export const imgWebp = () => {
   // Optimize images
   // imageOptimize()
   // Generate WebP versions of images
   return src(`${gulpPaths.build.images}**/*.{jpg,jpeg,png,gif}`, { encoding: false })
      .pipe(gulpPlumber(
         notify.onError({
            title: "IMAGE-WEBP",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(webp(config.webp))
      // Copy optimized WebP images to the dist folder
      .pipe(dest(gulpPaths.build.images))
}
//========================================================================================================================================================

