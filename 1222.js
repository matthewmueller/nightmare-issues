var Nightmare = require('nightmare')
var fs = require('fs')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  await nightmare.goto('https://www.google.com')

  try {
    await nightmare.cookies.set({
      name: 'hi',
      value: 'there',
      domain: 'https://www.google.com'
    })
  } catch (e) {
    console.log(e)
  }

  console.log('hi...')

  const title = await nightmare.evaluate(function() {
    return document.title
  })

  console.log(title)

  await nightmare.end()
}
