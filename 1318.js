var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  await nightmare.goto('https://google.com')

  const src = await nightmare.evaluate(() => {
    return document.querySelector('img').src
  })

  // download this image using request or superagent
  console.log(src)

  await nightmare.end()
}
