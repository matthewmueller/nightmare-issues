const Nightmare = require('nightmare')
const got = require('got')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  // get all the urls
  await nightmare.goto('https://google.com')
  const urls = await nightmare.evaluate(() => {
    const links = document.querySelectorAll('a[href^=http]')
    const urls = []
    for (let i = 0; i < links.length; i++) {
      const link = links[i]
      if (link.href) urls.push(link.href)
    }
    return urls
  })

  const statuses = await Promise.all(
    urls.map(async url => {
      const res = await got(url)
      return res.status
    })
  )

  console.log(statuses)

  await nightmare.end()
}
