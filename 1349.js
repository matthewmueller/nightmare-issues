const express = require('express')
const Nightmare = require('nightmare')
const http = require('http')

async function main() {
  const app = express()
  const server = await Server(app)

  // launch nightmare
  var nightmare = Nightmare({
    loadTimeout: 45 * 1000,
    waitTimeout: 5 * 1000
  })

  // go to /
  app.get('/', function(req, res) {
    console.log('arrived at /, redirecting to /a')
    res.redirect('/a')
  })

  // redirect to: /a
  app.get('/a', function(req, res) {
    setTimeout(() => {
      console.log('arrived at /a, redirecting to /b')
      res.redirect('/b')
    }, 1000)
  })

  // redirect to: /b
  app.get('/b', function(req, res) {
    console.log('arrived at /b, sending 200')
    res.sendStatus(200)
  })

  // goto "/"
  await nightmare.goto(server.url + '/')

  // wait until we're at "/b"
  await nightmare.wait(function(expectedURL) {
    return expectedURL == window.location.href
  }, server.url + '/b')

  // shut'er down
  await nightmare.end()
  await server.close()
}

async function Server(handler) {
  var server = await new Promise(function(res, rej) {
    var s = http.createServer(handler)
    s.listen(0, 'localhost', function() {
      res(s)
    })
  })

  const address = server.address()
  return {
    url: `http://${address.address}:${address.port}`,
    close: function() {
      return new Promise((res, rej) => server.close(res))
    }
  }
}

main()
  .then(() => console.log('done'))
  .catch(console.error)
