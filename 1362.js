const Nightmare = require('nightmare')
const express = require('express')
const http = require('http')

// setup download manager
require('nightmare-download-manager')(Nightmare)

main().catch(e => console.error('error', e))

function html(body) {
  return `<html><body>${body}</body></html>`
}

async function main() {
  const app = express()
  const server = await Server(app)

  // stream a csv
  app.post('/submit', (req, res) => {
    var data = [
      ['ID', 'Name', 'Age', 'Gender'],
      [1, 'Taro Yamada', 25, 'Male'],
      [2, 'Hanako Yamada', 24, 'Female'],
      [3, 'John Doe', 30, 'Male'],
      [4, 'Jane Doe', 30, 'Female']
    ]

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/csv')
    data.forEach(function(item) {
      res.write(
        item
          .map(function(field) {
            return '"' + field.toString().replace(/\"/g, '""') + '"'
          })
          .toString() + '\r\n'
      )
    })

    res.end()
  })

  // get the form
  app.get('/', (req, res) => {
    res.send(
      html(`
      <form method="post" action="/submit">
        <input id="btn" type="submit" value="submit"/>
      </form>
    `)
    )
  })

  const nightmare = Nightmare({ show: true })
  await nightmare.downloadManager()

  nightmare.on('download', (state, downloadItem) => {
    if (state == 'started') {
      nightmare.emit('download', 'test.csv', downloadItem)
    }
  })

  const res = await nightmare.goto(server.url + '/')
  console.log(res)
  await nightmare.click('#btn')

  // wait until all downloads have completed
  await nightmare.waitDownloadsComplete()

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
