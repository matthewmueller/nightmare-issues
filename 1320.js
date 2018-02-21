var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  // define a new action
  Nightmare.action(
    'onBeforeRequest',
    //define the action to run inside Electron
    function(name, options, parent, win, renderer, done) {
      win.webContents.session.webRequest.onBeforeRequest((details, cb) => {
        // call our event handler
        parent.call('onBeforeRequest', details, res => {
          res ? cb(Object.assign({}, res)) : cb({ cancel: false })
        })
      })
      done()
    },
    function(handler, done) {
      // listen for "onBeforeRequest" events
      this.child.respondTo('onBeforeRequest', handler)
      done()
    }
  )

  const nightmare = Nightmare({ show: true })

  // start listening
  await nightmare.onBeforeRequest((details, cb) => {
    if (details.resourceType === 'image') {
      return cb({ cancel: true })
    }
    cb({ cancel: false })
  })

  await nightmare.goto('https://google.com')

  await nightmare.end()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}
