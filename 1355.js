const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')

main().catch(e => console.error('error', e))

function html(body) {
  return `<!doctype><html><head><meta charset="UTF-8"> </head><body>${body}</body></html>`
}

async function main() {
  const app = express()
  const server = await Server(app)

  // input
  app.get('/', (req, res) => {
    res.send(
      html(`
      <textarea name="about_me"></textarea>
    `)
    )
  })

  const nightmare = Nightmare({ show: true })
  const res = await nightmare.goto(server.url + '/')
  await nightmare.insert("textarea[name='about_me']", '😂')

  await sleep(5000)

  // shutdown
  await nightmare.end()
  await server.close()
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

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}
