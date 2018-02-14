var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  // define a new action
  Nightmare.action(
    'onBeforeSendHeaders',
    //define the action to run inside Electron
    function(name, options, parent, win, renderer, done) {
      win.webContents.session.webRequest.onBeforeSendHeaders((details, cb) => {
        // call our event handler
        parent.call('onBeforeSendHeaders', details, res => {
          res ? cb(Object.assign({}, res)) : cb({ cancel: false })
        })
      })
      done()
    },
    function(handler, done) {
      // listen for "onBeforeSendHeaders" events
      this.child.respondTo('onBeforeSendHeaders', handler)
      done()
    }
  )

  const nightmare = Nightmare({ show: true })

  // start listening
  await nightmare.onBeforeSendHeaders((details, cb) => {
    console.log(details.headers)
    cb({ cancel: false })
  })

  await nightmare.goto('https://google.com')

  await nightmare.end()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}
