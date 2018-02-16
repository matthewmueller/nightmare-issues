var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  nightmare.use(getTitle)

  await nightmare.goto('https://segment.com')
  console.log(await nightmare.doctype())

  await nightmare.end()
}

function getTitle() {}

async function getDoctype() {
  return await this.evaluate(() => {
    return document.doctype
  })
}

// maybe pass options in
function doctype(opts) {
  return function(nightmare) {
    nightmare.doctype = getDoctype
    return nightmare
  }
}
