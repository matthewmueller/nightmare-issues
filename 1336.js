var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })
  const numbers = ['89616093018', '89616093012']
  const results = []

  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i]

    const result = await nightmare
      .goto('http://kody.su')
      .type('.search__field', n)
      .click('.search__submit')
      .wait('#text > div > p:nth-child(7)')
      .evaluate(
        () => document.querySelector('#text > div > p:nth-child(7)').textContent
      )

    results.push(result)
  }

  console.log('got results %s', results.join('\n'))

  await nightmare.end()
}
