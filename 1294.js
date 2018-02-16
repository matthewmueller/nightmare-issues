const Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })

  const el = await nightmare
    .goto('https://www.jucesponline.sp.gov.br/BuscaAvancada.aspx')
    .type(
      '#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaInicio',
      '10/10/2017'
    )
    .type('#ctl00_cphContent_frmBuscaAvancada_txtDataAberturaFim', '10/10/2017')
    .select('#ctl00_cphContent_frmBuscaAvancada_ddlTipoEmpresa', 21)
    .click('#ctl00_cphContent_frmBuscaAvancada_btPesquisar')
    .wait(2000)
    .wait('#ctl00_cphContent_gdvResultadoBusca_gdvContent')
    .evaluate(() => {
      return document.getElementById(
        'ctl00_cphContent_gdvResultadoBusca_gdvContent'
      ).nodeName
    })

  console.log(el)

  await nightmare.end()
}
