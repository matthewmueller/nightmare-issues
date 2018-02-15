const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')

main().catch(console.error)

async function main() {
  const app = express()
  const server = await Server(app)

  const nightmare = Nightmare({ show: false })
  app.get(
    '/',
    y(async (req, res) => {
      await nightmare.goto('https://site.com.br')

      await nightmare.wait(() => {
        return (
          document.querySelector('.footer-text-inner .one').textContent !== ''
        )
      })

      const result = await nightmare.evaluate(() => {
        return document.querySelector('.footer-text-inner .one').textContent
      })

      res.send(result)
    })
  )

  // NOTE: probably better to use superagent or
  // request here (but I'm lazy)
  const nightmare2 = Nightmare({ show: true })
  await nightmare2.goto(server.url, '/')
  const res = await nightmare2.evaluate(() => {
    return document.documentElement.textContent
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

// simple async/await handler for express
function y(p) {
  return function(req, res, next) {
    p(req, res).catch(next)
  }
}
