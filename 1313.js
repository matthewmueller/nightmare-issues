const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')

main().catch(console.error)

async function main() {
  const app = express()
  const server = await Server(app)

  app.get('/', (req, res) => {
    res.send(`
      <!doctype>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="refresh" content="0; url=redirect.html">
          <title>1st Page</title>
        </head>
        <body>redirecting soon</body>
      </html>
    `)
  })

  app.get('/redirect.html', (req, res) => {
    res.send(`
      <!doctype>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>2nd Page</title>
        </head>
        <body>redirected!</body>
      </html>
    `)
  })

  const nightmare = Nightmare({ show: true })

  await nightmare.goto(server.url, '/')
  await nightmare.wait(() => {
    return document.location.pathname === '/redirect.html'
  })

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
