const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  Press(Nightmare)

  const nightmare = Nightmare({ show: true })

  await nightmare.goto('https://google.com')
  await nightmare.type('#lst-ib', 'nightmare is cool')

  await nightmare.press('#lst-ib', 'Backspace')
  await nightmare.press('#lst-ib', 'Backspace')
  await nightmare.press('#lst-ib', 'Backspace')
  await nightmare.press('#lst-ib', 'Backspace')

  await nightmare.type('#lst-ib', 'awesome!')

  await sleep(5000)
  await nightmare.end()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}

function Press(Nightmare) {
  Nightmare.action(
    'press',
    function(name, options, parent, win, renderer, done) {
      // console.log(win)
      parent.respondTo('press', function(keyCode, done) {
        // keydown
        win.webContents.sendInputEvent({ type: 'keyDown', keyCode: keyCode })

        // keyup
        win.webContents.sendInputEvent({ type: 'keyUp', keyCode: keyCode })

        done()
      })
      done()
    },
    function(selector, keyCode, done) {
      // focus, press, blur
      // TODO: clean me up
      return this.evaluate_now(
        selector => document.querySelector(selector).focus(),
        () =>
          this.child.call('press', keyCode, () => {
            this.evaluate_now(
              selector => document.querySelector(selector).blur(),
              () => done(),
              selector
            )
          }),
        selector
      )
    }
  )
}
