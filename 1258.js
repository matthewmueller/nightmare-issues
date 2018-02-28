const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  Input(Nightmare)

  const nightmare = Nightmare({ show: true })

  await nightmare.goto('https://google.com')
  await nightmare.input('#lst-ib', 'nightmare is')
  await sleep(5000)
  await nightmare.input('#lst-ib', ' awesome')
  await nightmare.end()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}

function Input(Nightmare) {
  Nightmare.action(
    'input',
    function(name, options, parent, win, renderer, done) {
      parent.respondTo('input', function(value, done) {
        var chars = String(value).split('')

        function type() {
          var ch = chars.shift()
          if (ch === undefined) {
            return done()
          }

          // keydown
          win.webContents.sendInputEvent({
            type: 'keyDown',
            keyCode: ch
          })

          // keypress
          win.webContents.sendInputEvent({
            type: 'char',
            keyCode: ch
          })

          // keyup
          win.webContents.sendInputEvent({
            type: 'keyUp',
            keyCode: ch
          })

          // defer function into next event loop
          setTimeout(type, options.typeInterval)
        }

        // start
        type()
      })
      done()
    },
    function(selector, text, done) {
      // focus, type
      return this.evaluate_now(
        selector => document.querySelector(selector).focus(),
        () => this.child.call('input', text, done),
        selector
      )
    }
  )
}
