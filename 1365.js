const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

app.use(cookieParser('yolo'))

app.get('/', function(req, res) {
  res.cookie('test', 'value', { signed: true })
  res.sendStatus(200)
})

app.get('/cookie', function(req, res) {
  res.send(req.signedCookies['test'])
})

const server = app.listen(5000, () => {
  console.log('listening on http://localhost:5000')
  main()
    .catch(e => console.error('error', e))
    .then(() => server.close())
})

const cookie = require('cookie-signature')
const Nightmare = require('nightmare')

async function main() {
  const nightmare = Nightmare()

  const name = 'test'
  const secret = 'yolo'
  const value = 'coolness'
  const signed = 's:' + cookie.sign(value, secret)

  const headers = {
    Cookie: [name, signed].map(encodeURIComponent).join('=')
  }

  await nightmare.goto('http://localhost:5000/cookie', headers)
  const res = await nightmare.evaluate(() => document.body.textContent)
  console.log('cookie =', res)

  await nightmare.end()
}
