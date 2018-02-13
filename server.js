const http = require('http')

module.exports = async function Server(handler) {
  const server = await new Promise((res, _rej) => {
    var s = http.createServer(handler)
    s.listen(0, 'localhost', function() {
      res(s)
    })
  })

  const address = server.address()
  return {
    url: `http://${address.address}:${address.port}`,
    close: function() {
      return new Promise((res, _rej) => server.close(res))
    }
  }
}
