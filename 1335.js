var Nightmare = require('nightmare')
var fs = require('fs')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })
  const query = 'hello nightmare'

  const buf = await nightmare
    .goto('https://google.com')
    .type('#lst-ib', query)
    .click('[name="btnK"]')
    .wait('#main')
    .scrollTo(500, 0)
    .screenshot()

  // write the file
  await new Promise((res, rej) => {
    fs.writeFile('screenshot.png', buf, err => (err ? rej(err) : res()))
  })

  await nightmare.end()
}
