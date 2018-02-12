const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

const filter = value => value.indexOf('Google') === -1

nightmare
  .goto('https://www.google.co.jp')
  .evaluate(() => {
    const value = document
      .querySelector('input[name="btnK"]')
      .getAttribute('value')
    return value
  })
  .then(value => filter(value))
  .then(result => console.log(result))
  .catch(e => console.error(e))
  .then(() => nightmare.end())
