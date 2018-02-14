const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  nightmare.on('did-finish-load', function() {
    console.log('FINISHED!')
  })

  await nightmare.goto('http://www.bildindex.de/document/obj67004025')

  const title = await nightmare.evaluate(() => {
    return document.title
  })
  console.log('title', title)

  await nightmare.end()
}
