const Nightmare = require('nightmare')
const assert = require('assert')

describe('google', () => {
  let nightmare

  beforeEach(async () => {
    nightmare = Nightmare({ show: false })
  })

  afterEach(async () => {
    const screenshot = await nightmare.screenshot()
    console.log(screenshot)
    await nightmare.end()
  })

  it('should check the title', async function() {
    this.timeout('10s')

    await nightmare.goto('https://google.com')

    // test the title
    const title = await nightmare.title()
    assert.equal(title, 'Google')
  })
})

// const Nightmare = require('nightmare')
// const assert = require('assert')

// // your tests
// function TestGoto(tape) {
//   test(tape, async nightmare => {
//     await nightmare.goto('https://google.com')
//     assert.equal('Google', await nightmare.title())
//   })
// }

// // test helper
// async function test(tape, fn) {
//   const nightmare = Nightmare({ show: false })
//   let err

//   // don't let failed assertion kill the node process
//   try {
//     await fn()
//   } catch (e) {
//     err = e
//     tape.fail(err)
//   }

//   // take a screenshot either way
//   const buf = await nightmare.screenshot()
//   await fs.writeFile('screenshot.png', buf)
//   await nightmare.end()

//   // finally fail or pass
//   err ? tape.fail(err) : tape.pass()
// }
