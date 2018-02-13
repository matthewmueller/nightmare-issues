const Nightmare = require('nightmare')

main().catch(e => console.error('error', e))

async function main() {
  const nightmare = Nightmare()

  await nightmare.goto('https://supercoolwebsite.com/account/sign-in')

  await nightmare.insert('input[name="phoneEmailUsername"] ', username)
  await nightmare.insert('input[name="password"] ', password)
  await nightmare.click('supercoolloginbutton')

  await nightmare.wait('body')

  // Run the following if auth succeeds else throw Error saying auth failed.
  const res = await nightmare.goto(
    `https://api.supercoolwebsite.com/v1/transaction-history?start_date=${startDate}&end_date=${endDate}`
  )

  if (res.code === 200) {
    console.log('do this')
  } else {
    console.log('do that')
  }

  // Run the following if api call succeeds else throw Error saying api call failed.
  await nightmare.evaluate(() => {
    return JSON.parse(document.body.innerText)
  })

  await nightmare.end()
}
