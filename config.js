export const mainParams = {
  IS_LOG: true,
  IS_TAILWIND: true,
  WEBP_COMPRESS: 80,
  JPEG_COMPRESS: 80,
  PNG_COMPRESS: [0.7, 0.7],
}

export const config = {
  tailwindjs: "./tailwind.config.js",
  port: 4000,
  purgecss: {
    content: ["src/**/*.{html,htm,js,php}"],
    safelist: {
      standard: [/^pre/, /^code/],
      greedy: [/token.*/],
    },
  },

  include: {
    prefix: '@@',
    basepath: '@root'
  },

  webp: {
    quality: mainParams.WEBP_COMPRESS // Webp quality
  },

  imagemin: {
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    interlaced: true,
    png: mainParams.PNG_COMPRESS, // Png quality
    jpeg: mainParams.JPEG_COMPRESS, // Jpeg quality
  },
}


// tailwind plugins
export const plugins = {
  typography: true,
  forms: true,
  containerQueries: true,
}

// Project Paths
const buildFolder = `./build`
const distFolder = `./.tmp`
const srcFolder = `./src`

export const gulpPaths = {
  dist: {
    base: `${distFolder}/`,
    js: `${distFolder}/js/`,
    css: `${distFolder}/css/`,
    images: `${distFolder}/img/`,
    fonts: `${distFolder}/fonts/`,
    files: `${distFolder}/files/`,
    thirdParty: `${distFolder}/thirdParty/`
  },
  build: {
    base: `${buildFolder}/`,
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    thirdParty: `${buildFolder}/thirdParty/`
  },
  src: {
    base: `${srcFolder}/`,
    js: `${srcFolder}/js/`,
    scss: `${srcFolder}/scss/`,
    components: `${srcFolder}/components/`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
    fonts: `${srcFolder}/fonts/`,
    files: `${srcFolder}/files/**/*.*`,
    thirdParty: `${srcFolder}/files/**/*.*`,
  },
}

export const logSymbols = {
  success: '✅',
  info: '🚩',
  warning: '❗',
  error: '❌',
  clock: '⌛',
  question: '👀',
  alarm: '🚨',
  star: '🌟'
}