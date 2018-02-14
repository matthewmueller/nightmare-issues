const Nightmare = require('nightmare')

describe('test duckduckgo search results', () => {
  it('should find the nightmare github link first', function(done) {
    this.timeout('10s')

    const nightmare = Nightmare({
      show: true
    })
    nightmare
      .goto('https://duckduckgo.com')
      .type('#search_form_input_homepage', 'github nightmare')
      .click('#search_button_homepage')
      .wait('#zero_click_wrapper .c-info__title a')
      .evaluate(
        () =>
          document.querySelector('#zero_click_wrapper .c-info__title a').href
      )
      .end()
      .then(link => {
        expect(link).to.equal('https://github.com/segmentio/nightmare')
        done()
      })
  })
})
