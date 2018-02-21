const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')
const path = require('path')

main().catch(console.error)

function html(body) {
  return `<!doctype><html><head><meta charset="UTF-8"> </head><body>${body}</body></html>`
}

async function main() {
  const app = express()
  const server = await Server(app)

  app.get('/', (req, res) => {
    res.send(html(`server response here`))
  })

  const nightmare = Nightmare({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    show: true
  })

  nightmare.on('console', function() {
    console.log(arguments)
  })

  await nightmare.goto(server.url + '/?key=value')

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
