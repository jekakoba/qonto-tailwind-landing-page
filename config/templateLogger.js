import { mainParams } from '../config.js'
export const templateLogger = (message, logSymbol) => {
   const iconType = logSymbols[logSymbol]
   if (mainParams.IS_LOG) {
      console.log(`\n\t${iconType} ${message}\n`)
   }
}

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
