const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })

nightmare.on('console', console.log)

nightmare
  .goto('http://localhost:5000')
  // .evaluate(function() {
  //   return window.__nightmare
  // })
  // .then(result => console.log(result))
  .catch(e => console.error(e))
  .then(() => nightmare.end())
