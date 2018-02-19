var Nightmare = require('nightmare')
var fs = require('fs')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })
  const query = 'hello nightmare'

  await nightmare.goto('https://google.com')
  const clip = await nightmare.evaluate(() => {
    const el = document.querySelector('[name="btnI"]')
    const rect = el.getBoundingClientRect()
    return {
      x: Math.round(rect.left),
      y: Math.round(rect.top),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    }
  })

  // take the screenshot with clipping
  const buf = await nightmare.screenshot(clip)

  // write the file
  await new Promise((res, rej) => {
    fs.writeFile('screenshot.png', buf, err => (err ? rej(err) : res()))
  })

  await nightmare.end()
}
