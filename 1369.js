const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

const filter = value => value.indexOf('Google') === -1

nightmare
  .goto('https://www.google.co.jp')
  .evaluate(filter => {
    const value = document
      .querySelector('input[name="btnK"]')
      .getAttribute('value')
    return filter(value)
  }, filter)
  .end()
  .then(result => console.log(result))
  .catch(e => console.error(e))
