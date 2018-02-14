const Nightmare = require('nightmare')
const Server = require('./server')
const express = require('express')

main().catch(console.error)

function html(body) {
  return `<!doctype><html><head><meta charset="UTF-8"> </head><body>${body}</body></html>`
}

async function main() {
  const app = express()
  const server = await Server(app)

  app.get('/', (req, res) => {
    res.send(
      html(`
    <button id="info.test.a" onClick="window:alert('hi')">button with a weird id</button>`)
    )
  })

  const nightmare = Nightmare({ show: true })

  await nightmare.goto(server.url, '/')

  const a = new Deferred()
  nightmare.once('page', (type, message) => {
    a.resolve({ type, message })
  })
  await nightmare.click('button[id="info.test.a"]')

  const b = new Deferred()
  nightmare.once('page', (type, message) => {
    b.resolve({ type, message })
  })
  await nightmare.click('#info\\.test\\.a')

  console.log(await a)
  console.log(await b)

  await nightmare.end()
  await server.close()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}

function Deferred() {
  const p = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })

  this.then = p.then.bind(p)
  this.catch = p.catch.bind(p)
}
