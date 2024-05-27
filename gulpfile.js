
import gulp from 'gulp'
const { series, parallel, watch } = gulp

import { gulpPaths, config, mainParams, logSymbols } from "./config.js"
import browserSync from "browser-sync"
import connectPHP from "gulp-connect-php"
import { devStyles, prodStyles } from "./config/tasks/styles.js"
import { devClean, prodClean } from "./config/tasks/clean.js"
import { devScripts, prodScripts } from "./config/tasks/scripts.js"
import { devImages, imageOptimize, imgWebp } from "./config/tasks/images.js"
import { devFonts, prodFonts, fontsStyle } from "./config/tasks/fonts.js"
import { devThirdParty, prodThirdParty } from "./config/tasks/thirdParty.js"
import { devHTML, prodHTML, prodHTMLNoWebp } from "./config/tasks/html.js"

//Load Previews on Browser on dev
function livePreview(done) {
  browserSync.init({
    server: {
      baseDir: gulpPaths.dist.base,
      middleware: [
        function (req, res, next) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate")
          res.setHeader("Pragma", "no-cache")
          res.setHeader("Expires", "0")
          next()
        }
      ]
    },
    port: config.port || 4000,
  })
  done()
}
function livePreviewPhp(done) {
  connectPHP.server({
    base: gulpPaths.dist.base,
    port: 8000,
    keepalive: true,
    open: false
  }),
    browserSync.init({
      port: config.port || 4000,
      proxy: 'localhost:8000',
    }),
    done()
}

function watchFiles() {
  // Observation of HTML files
  watch(`${gulpPaths.src.base}**/*.{htm,html,json}`, series(devHTML, mainParams.IS_TAILWIND && devStyles, previewReload))
  // SCSS File Observation and TailWind CSS configuration files (if specified in configuration)
  watch([config.tailwindjs && config.tailwindjs, `${gulpPaths.src.base}**/*.scss`], series(devStyles, previewHotReload))
  // Observing JS files
  watch(`${gulpPaths.src.js}**/*.js`, series(devScripts, previewReload))
  // Image observation
  watch(`${gulpPaths.src.images}`, series(devImages, previewReload))
  // Observing fonts
  watch(`${gulpPaths.src.fonts}**/*`, series(devFonts, previewReload))
  // Observing the files of third-party libraries
  watch(gulpPaths.src.thirdParty, series(devThirdParty, previewReload))
}


const previewReload = (done) => {
  console.log("\n\t" + logSymbols.question, "Reloading Browser Preview.\n")
  browserSync.reload()
  done()
}

const previewHotReload = (done) => {
  console.log("\n\t" + logSymbols.question, "Hot Reloading Browser Preview.\n")
  done()
}

export const dev = series(
  devClean,
  parallel(devFonts, fontsStyle, devStyles, devScripts, devImages, devThirdParty, devHTML),
  livePreview,
  watchFiles
)

export const devPhp = series(
  devClean,
  parallel(devFonts, fontsStyle, devStyles, devScripts, devImages, devThirdParty, devHTML),
  livePreviewPhp,
  watchFiles
)

export const prod = series(
  prodClean,
  parallel(prodFonts, fontsStyle, imageOptimize, prodStyles, prodScripts, prodHTMLNoWebp, prodThirdParty),
  buildFinish
)

export const webp = series(
  prodClean,
  imageOptimize,
  parallel(prodFonts, fontsStyle, prodStyles, imgWebp, prodScripts, prodHTML, prodThirdParty),
  buildFinish
)

function buildFinish(done) {
  console.log(`\n\t${logSymbols.success} Production build is complete. Files are located at ${gulpPaths.build.base}\n`)
  done()
}