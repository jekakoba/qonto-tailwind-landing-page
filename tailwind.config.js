import { config, mainParams } from "./config.js" //options from config.js
import typography from "@tailwindcss/typography"
import forms from "@tailwindcss/forms"
import containerQueries from "@tailwindcss/container-queries"

if (mainParams.IS_TAILWIND) {
	const allPlugins = {
		typography,
		forms,
		containerQueries,
	}

	const plugins = Object.values(allPlugins).filter((plugin) => {
		return plugin && config.plugins && config.plugins[plugin.name]
	})
	/** @type {import('tailwindcss').Config} */
	module.exports = {
		content: ["./src/**/*.{html,htm,scss,js,php}"],
		darkMode: "class",
		theme: {
			extend: {
				colors: {
					transparent: 'transparent',
					current: 'currentColor',
					'white': '#fff',
					'black': {
						light: '#1D1D1B',
						dark: '#000000',
					},
					'purple': '#D5C8FB',
					'yellow': '#F4F8AC',
					'green': '#DFF9F0',
					'orange': '#FFEADD',
				},
				screens: {
					'mobileSmall': '320px',
					'mobile': '479.98px',
					'mobileMax': { 'max': '767.98px' },
					'tablet': '768px',
					'laptop': '991.98px',
					'desktop': '1280px',
				},
				fontFamily: {
					'inter': ['Inter', 'sans-serif'],
				},
				fontWeight: {
					'light': 300,
					'normal': 400,
					'medium': 500,
					'bold': 700,
				},

				// Transitions
				transition: {
					'color': 'color',
					'opacity': 'opacity',
					'tansform': 'tansform',
				},
				transitionDuration: {
					'3': '300ms',
					'6': '600ms',
					'1': '1000ms',
				},
				transitionDelay: {
					'3': '300ms',
					'6': '600ms',
					'1': '1000ms',
				},
				TransitionTimingFunction: {
					'ease': 'ease',
					'ease-in': 'ease-in',
					'ease-out': 'ease-out',
					'ease-in-out': 'ease-in-out',
					'linear': 'linear',
				}
			},
		},
		plugins: plugins,
	}
}
