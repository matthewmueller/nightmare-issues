const Nightmare = require('nightmare')
const Server = require('./server')
const express = require('express')

main().catch(console.error)

async function main() {
  const app = express()
  const server = await Server(app)

  app.get('/', (req, res) => {
    res.sendStatus(200)
  })

  Nightmare.action(
    'addLinkMatch',
    (name, options, parent, win, renderer, done) => {
      parent.respondTo('addLinkMatch', done => {
        win.addDevToolsExtension('..//dist').addLinkMatch(done)
      })
      done()
    },
    function(done) {
      this.child.call('addLinkMatch', done)
    }
  )

  const nightmare = Nightmare({
    openDevTools: { mode: 'detach' },
    alwaysOnTop: true,
    show: true
  })

  await nightmare.goto(server.url + '/')

  await nightmare.end()
  await server.close()
}
