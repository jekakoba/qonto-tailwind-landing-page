
// =============================================================================
// Documentation of the plugin: https://www.lightgalleryjs.com/docs/
// =============================================================================

// Connecting a base set of functionality
import lightGallery from 'lightgallery'

// =============================================================================

// Plugins
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, lgShare, lgThumbnail, lgVideo, lgMediumZoom
// import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
//import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

// =============================================================================

// Basic styles
// import '../../scss/libs/gallery/lightgallery.scss'

// Supplements
// import '../../scss/libs/gallery/lg-thumbnail.scss';
// import '../../scss/libs/gallery/lg-video.scss';
// import '../../scss/libs/gallery/lg-autoplay.scss';
// import '../../scss/libs/gallery/lg-zoom.scss';
// import '../../scss/libs/gallery/lg-pager.scss';
// import '../../scss/libs/gallery/lg-fullscreen.scss';
// import '../../scss/libs/gallery/lg-share.scss';
// import '../../scss/libs/gallery/lg-comments.scss';s
// import '../../scss/libs/gallery/lg-rotate.scss';
// import '../../scss/libs/gallery/lg-medium-zoom.scss';
// import '../../scss/libs/gallery/lg-relative-caption.scss';


// =============================================================================
// Launch
const galleries = document.querySelectorAll('[data-gallery]')
if (galleries.length) {
	let galleyItems = []
	galleries.forEach(gallery => {
		galleyItems.push({
			gallery,
			galleryClass: lightGallery(gallery, {
				// plugins: [lgZoom, lgThumbnail],
				licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
				speed: 500,
				selector: '.gallery-img',
				download: false,
				mobileSettings: {
					controls: false
				}
			})
		})
	})
}





