import gulp from 'gulp'
const { src } = gulp
import clean from "gulp-clean"
const logSymbols = {
   success: '✅',
   info: '🚩',
   warning: '❗',
   error: '❌',
   clock: '⌛',
   question: '👀',
   alarm: '🚨',
   star: '🌟'
}
import { gulpPaths } from "../../config.js"
export function devClean() {
   console.log("\n\t" + logSymbols.info, "Cleaning dist folder for fresh start.\n")
   return src(gulpPaths.dist.base, { read: false, allowEmpty: true }).pipe(
      clean()
   )
}

export function prodClean() {
   console.log("\n\t" + logSymbols.info, "Cleaning build folder for fresh start.\n")
   return src(gulpPaths.build.base, { read: false, allowEmpty: true }).pipe(
      clean()
   )
}
