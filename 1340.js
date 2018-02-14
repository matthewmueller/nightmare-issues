var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  Nightmare.action(
    'show',
    (name, options, parent, win, renderer, done) => {
      parent.respondTo('show', fn => {
        win.show()
        fn()
      })
      done()
    },
    function(done) {
      this.child.call('show', done)
    }
  )

  Nightmare.action(
    'hide',
    (name, options, parent, win, renderer, done) => {
      parent.respondTo('hide', fn => {
        win.hide()
        fn()
      })
      done()
    },
    function(done) {
      this.child.call('hide', done)
    }
  )

  var nightmare = Nightmare({ show: true })
  await nightmare.goto('http://google.com')
  console.log('hiding')
  await nightmare.hide()
  await sleep(1000)
  console.log('showing')
  await nightmare.show()
  await sleep(1000)
  await nightmare.end()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}
