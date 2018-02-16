const Nightmare = require('nightmare')
const assert = require('assert')

main().catch(console.error)

async function main() {
  assert(process.env.USER, 'missing USER env')
  assert(process.env.PASS, 'missing PASS env')

  // non-working plugin i'm using
  SessionFlusher(Nightmare)

  const nightmare = Nightmare({
    show: true,
    webPreferences: {
      partition: 'persist:nightmare'
    },
    paths: {
      userData: process.cwd()
    }
  })

  await nightmare.goto('https://github.com/segmentio/nightmare')

  await nightmare
    .click(
      'body > div.position-relative.js-header-wrapper > header > div > div.HeaderMenu.HeaderMenu--bright.d-flex.flex-justify-between.flex-auto > div > span > div > a:nth-child(1)'
    )
    .type('#login_field', process.env.USER)
    .type('#password', process.env.PASS)
    .click(
      '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block'
    )
    .wait('#user-links')

  await nightmare.flushSession()
  await sleep(1000)

  await nightmare.end()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}

// try to flush the session data
function SessionFlusher(Nightmare) {
  Nightmare.action(
    'flushSession',
    (name, options, parent, win, renderer, done) => {
      parent.respondTo('flushSession', done => {
        win.webContents.session.flushStorageData()
        done()
      })
      done()
    },
    function(done) {
      this.child.call('flushSession', done)
    }
  )
}
