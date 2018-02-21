const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  let nightmare = Nightmare({
    show: true,
    dock: true,
    openDevTools: {
      mode: 'detach'
    }
  })

  await nightmare.goto('http://facebook.com')
  await nightmare.type('#email', 'xxx') // starts typing in #firstname field

  await nightmare.end()
}
