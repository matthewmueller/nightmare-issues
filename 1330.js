var Nightmare = require('nightmare')
var fs = require('fs')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })
  const query = 'hello nightmare'

  const buf = await nightmare
    .viewport(1500, 1600)
    .goto(
      'http://shawcommercial-stg.azularcdev.com/client/#/room/bedroom-001/0733V/33100/9X36/ashlar/5/0/0'
    )
    .wait(10000)
    .screenshot()

  // write the file
  await new Promise((res, rej) => {
    fs.writeFile('screenshot.png', buf, err => (err ? rej(err) : res()))
  })

  await nightmare.end()
}
