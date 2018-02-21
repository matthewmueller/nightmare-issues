// Puppeteer code
const puppeteer = require('puppeteer')
puppeteer
  .launch({
    headless: false
  })
  .then(async browser => {
    const page = await browser.newPage()
    await page.setViewport({
      width: 1300,
      height: 800
    })

    try {
      await page.goto('https://www.upwork.com/login')
      let title = await page.title()
      console.log(title)
    } catch (e) {
      console.log(e)
    }
  })
