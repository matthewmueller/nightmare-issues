var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  const storedCookies = [
    {
      name: 'token',
      value: 'some token'
    },
    {
      name: 'token2',
      value: 'some token2'
    }
  ]

  await nightmare.goto('https://google.com')
  await nightmare.cookies.set(storedCookies)

  const cookies = await nightmare.cookies.get()

  console.log(
    cookies.filter(cookie => {
      return ~cookie.name.indexOf('token')
    })
  )

  await nightmare.end()
}
