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
