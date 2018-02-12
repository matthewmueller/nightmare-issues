var Nightmare = require('nightmare')
var page = Nightmare({ show: true }).goto('http://yahoo.com')

page
  .wait(function() {
    return false
  })
  .run(function(error, result) {
    if (error) {
      console.log('Error waiting for nothing:', error)
    } else {
      console.log("Inifnite wait finished, but shouldn't have! (uhoh)")
    }
  })

page
  .wait(function() {
    return document.querySelector('.darla').firstChild.nodeName === 'IFRAME'
  })
  .run(function(error, result) {
    if (error) {
      console.log('Error waiting for ad to load:', error)
    } else {
      console.log('First ad is loaded')
    }
  })
