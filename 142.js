const Nightmare = require('nightmare')

async function main() {
  nightmare = Nightmare({ show: true })
  nightmare.on('log', console.log)
  url = 'https://finance.qq.com/a/20180124/027737.htm'
  try {
    var body_source = await nightmare
      .goto(url)
      .wait(5000)
      .evaluate(function() {
        return document.body.innerHTML
      })
    console.log(body_source)
  } catch (error) {
    console.log(error)
  }
  await nightmare.end()
}

main().catch(console.error)
