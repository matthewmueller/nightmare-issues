const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')

main().catch(console.error)

function html(body, head) {
  return `<!doctype><html><head><meta charset="UTF-8">${head ||
    ''}</head><body>${body}</body></html>`
}

async function main() {
  const app = express()
  const server = await Server(app)

  app.get('/', (req, res) => {
    res.send(
      html(
        `<h2>hello world</h2>`,
        `<meta http-equiv="refresh" content="1;url=${server.url}/">`
      )
    )
  })

  const nightmare = Nightmare({
    loadTimeout: 45 * 1000,
    waitTimeout: 10 * 1000,
    show: true
  })

  await nightmare.goto(server.url, '/')

  console.log(
    await nightmare.evaluate(() => document.documentElement.outerHTML)
  )

  await nightmare.wait(5000)

  console.log(
    await nightmare.evaluate(() => document.documentElement.outerHTML)
  )

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
