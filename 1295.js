const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')

main().catch(console.error)

async function main() {
  const app = express()
  const server = await Server(app)

  app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
        <style>
          *{margin:0,padding:0}
          thead, thead tr, thead tr th{margin:0,padding:0}
        </style>
      </head>
      <body>
            <table>
              <thead>
                <tr>
                  <th>Col1</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>Data1</td>
                </tr>
              </tbody>
            </table>
      </body>
    </html>
    `)
  })

  const nightmare = Nightmare({ show: true })
  await nightmare.goto(server.url, '/')
  await sleep(5000)

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
