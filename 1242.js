const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')

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
    <button id="target" style="margin:100px" ontouchend="window:alert('touched')">button with a weird id</button>`)
    )
  })

  const nightmare = Nightmare({ show: true })

  await nightmare.goto(server.url, '/')

  // handle the alert
  const touched = new Deferred()
  nightmare.once('page', (type, message) => {
    touched.resolve({ type, message })
  })

  // touchend
  await nightmare.evaluate(selector => {
    var target = document.querySelector(selector)
    if (!target) return

    const rect = target.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const touchObj = new Touch({
      identifier: Date.now(),
      target: target,
      clientX: x,
      clientY: y,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: 0.5
    })

    const touchEvent = new TouchEvent('touchend', {
      cancelable: true,
      bubbles: true,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj],
      shiftKey: false
    })

    target.dispatchEvent(touchEvent)
  }, '#target')

  await touched
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

async function Server(handler) {
  const server = await new Promise((res, _rej) => {
    var s = http.createServer(handler)
    s.listen(0, 'localhost', function() {
      res(s)
    })
  })

  const address = server.address()
  return {
    url: `http://${address.address}:${address.port}`,
    close: function() {
      return new Promise((res, _rej) => server.close(res))
    }
  }
}
