const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true, gotoTimeout: 1200000 })
  const pageurl =
    'http://www.gamestop.com/pc/consoles/alienware-steam-machine-i7-1tb/121863'

  console.time('goto')
  await nightmare.goto(pageurl)
  console.timeEnd('goto')

  // await nightmare.wait(waitInMs)
  console.log(await nightmare.title())

  await nightmare.end()
}
