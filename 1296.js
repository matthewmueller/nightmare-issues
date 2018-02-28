const Nightmare = require('nightmare')
const assert = require('assert')

main().catch(console.error)

async function main() {
  assert(process.env.USER, 'missing USER env')
  assert(process.env.PASS, 'missing PASS env')

  CookieFlusher(Nightmare)

  const nightmare = Nightmare({
    show: true,
    webPreferences: {
      partition: 'persist:nightmare8'
    },
    paths: {
      userData: process.cwd()
    }
  })

  // console.log(await nightmare.engineVersions())
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

    
  await nightmare.flushCookies()
  await nightmare.end()
}


// try to flush the session data
function CookieFlusher(Nightmare) {
  Nightmare.action(
    'flushCookies',
    (name, options, parent, win, renderer, done) => {
      parent.respondTo('flushCookies', done => {
        win.webContents.session.cookies.flushStore(done)
      })
      done()
    },
    function(done) {
      this.child.call('flushCookies', done)
    }
  )
}
