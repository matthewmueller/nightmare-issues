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
    res.send(html(`<h2>hello world</h2>`))
  })

  const nightmare = Nightmare({
    loadTimeout: 45 * 1000,
    waitTimeout: 5 * 1000,
    show: true
  })

  await nightmare.goto(server.url, '/')

  // nightmare code here
  const h2 = await nightmare.evaluate(() => {
    return document
      .evaluate('//h2', document, null, XPathResult.ANY_TYPE, null)
      .iterateNext().textContent
  })
  console.log(h2)

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
