const cookieParser = require('cookie-parser')
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

  app.use(cookieParser())

  app.get('/', (req, res) => {
    res.cookie('cookie', 'monster')
    res.send(html(`<a href="/dash" target="_blank">Dashboard</a>`))
  })

  app.get('/alt', (req, res) => {
    res.cookie('cookie', 'monster')
    res.send(html(`<a href="/dash">Dashboard</a>`))
  })

  app.get('/dash', (req, res) => {
    console.log(req.cookies)
    const cookie = req.cookies['cookie']
    res.send(html(`Got cookie: ${JSON.stringify(cookie)}`))
  })

  console.log('listening on %s', server.url)

  // const nightmare = Nightmare({ show: true })
  // await nightmare.goto(server.url, '/alt')
  // await sleep(1000)
  // await nightmare.click('a')
  // await sleep(2000)

  // await nightmare.end()
  // await server.close()
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
