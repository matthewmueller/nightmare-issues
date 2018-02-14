const Nightmare = require('nightmare')
const Server = require('./server')
const express = require('express')

main().catch(console.error)

function html(body) {
  return `<!doctype><html><head><meta charset="UTF-8"> </head><body>${body}</body></html>`
}

async function main() {
  const app = express()
  const server = await Server(app)

  app.get('/', (req, res) => {
    res.send(
      html(`
    <div class="derp">a</div>
    <div class="derp">b</div>
    <div class="derp">c</div>`)
    )
  })

  const nightmare = Nightmare({
    loadTimeout: 45 * 1000,
    waitTimeout: 5 * 1000,
    show: true
  })

  await nightmare.goto(server.url, '/')

  const res = await nightmare.evaluate(() => {
    return document.querySelector('.derp:nth-child(2)').textContent
  })
  console.log(res)

  await nightmare.end()
  await server.close()
}
