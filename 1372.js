var Nightmare = require('nightmare')

async function main() {
  var urls = [
    'http://example1.com',
    'http://example2.com',
    'http://example3.com'
  ]

  var nightmare = Nightmare({ show: true })

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const title = await nightmare
      .goto(url)
      .wait('body')
      .title()

    console.log(url, title)
  }

  await nightmare.end()
}

main().catch(console.error)

// urls
//   .reduce(function(accumulator, url) {
//     return accumulator.then(function(results) {
//       return nightmare
//         .goto(url)
//         .wait('body')
//         .evaluate(function() {
//           return document.title
//         })
//       // Run getTitle 10 times
//     })
//   }, Promise.resolve([]))
//   .then(function(results) {
//     console.dir(results)
//   })

// function getTitle() {
//   return nightmare.title()
// }
