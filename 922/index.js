const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')
const Xvfb = require('xvfb')
const got = require('got')

main().catch(console.error)

// main function
async function main() {
  const app = express()
  const server = await Server(app)
  let i = 99

  // route
  app.get(
    '/',
    y(async (req, res) => {
      const port = i--
      const close = await xvfb({ displayNum: port })
      const nightmare = Nightmare({
        show: false,
        env: {
          DISPLAY: ':' + port
        }
      })

      await nightmare.goto(req.query.url)
      const title = await nightmare.title()

      res.send(title)

      await nightmare.end()
      await close()
    })
  )

  const urls = [
    'https://google.com',
    'https://segment.com',
    'http://nightmarejs.org',
    'https://github.com',
    'https://standupjack.com'
  ]

  console.time('urls')
  const titles = await Promise.all(
    urls.map(url => {
      return got(server.url + '/?url=' + url, { timeout: 30000 }).then(
        res => res.body
      )
    })
  )
  console.timeEnd('urls')
  console.log(titles)

  await server.close()
}

// xvvb wrapper
function xvfb(options) {
  var xvfb = new Xvfb(options)
  console.log(options)

  function close() {
    return new Promise((resolve, reject) => {
      xvfb.stop(err => (err ? reject(err) : resolve()))
    })
  }

  return new Promise((resolve, reject) => {
    xvfb.start(err => (err ? reject(err) : resolve(close)))
  })
}

// try/catch helper
async function poss(promise) {
  try {
    const result = await promise
    return [null, result]
  } catch (err) {
    return [err, null]
  }
}

// simple async/await handler for express
function y(p) {
  return function(req, res, next) {
    p(req, res).catch(next)
  }
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
