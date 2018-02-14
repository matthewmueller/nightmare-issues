var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  // console.log(process.pid)
  var nightmare = Nightmare({ show: true })
  await nightmare.goto('http://europaplus.ru')
  await sleep(5000)
  await nightmare.end()
}

function sleep(ms) {
  return new Promise(res => setTimeout(res, ms))
}
