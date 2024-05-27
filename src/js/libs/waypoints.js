import './waypoints-lib.min.js'

function createWaypoint(selector, callback) {
   const element = document.querySelector(selector)
   if (!element) return
   const newEl = new Waypoint({
      element,
      handler: function () {
         callback()
      }
   })
}

// Example

createWaypoint('.waypoint', () => {
   console.log('waypoint')
})
