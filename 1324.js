const Nightmare = require('nightmare')
const assert = require('assert')
const poss = require('poss')

describe('mocha', () => {
  it('Load a Page / (Home Page) should load without error', async function() {
    this.timeout('10s')

    const nightmare = Nightmare({ show: true })
    const [err, res] = await poss(nightmare.goto('https://gethoodie.com/'))
    await nightmare.end()

    if (err) throw err
    assert.equal(res.code, 200)
  })
})
