const Nightmare = require('nightmare')

function Test() {
  if (!(this instanceof Test)) return new Test()
}

Promise.resolve(new Test()).then(v => console.log('Test', v))
Promise.resolve(new Nightmare()).then(v => console.log('Nightmare', v))
