var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  await nightmare.goto('https://google.com')

  await nightmare.cookies.set('token', 'value')

  const cookies = await evaluateAndGetCookies(nightmare, () => {
    var script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    document.head.appendChild(script)
  })

  console.log(
    cookies.filter(cookie => {
      return ~cookie.name.indexOf('token')
    })
  )

  await nightmare.end()
}

async function evaluateAndGetCookies(nightmare, expr) {
  await nightmare.evaluate(expr)
  return await nightmare.cookies.get()
}
