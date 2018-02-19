const Nightmare = require('nightmare')

main().catch(console.error)

// main function
async function main() {
  const nightmare = Nightmare()

  const [err, title] = await poss(run(nightmare))
  if (err) {
    // cleanup properly
    await nightmare.end()
    throw err
  }

  console.log(title)

  // shut'er down
  await nightmare.end()
}

// run nightmare
//
// put all your nightmare commands in here
async function run(nightmare) {
  console.time('goto')
  await nightmare.goto('https://google.com')
  console.timeEnd('goto')
  console.time('title')
  const title = await nightmare.title()
  console.timeEnd('title')
  return title
}

// try/catch helper
async function poss(promise) {
  try {
    const result = await promise
    return [null, result]
  } catch (err) {
    return [err, null]
  }
}
