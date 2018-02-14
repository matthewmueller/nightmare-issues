var Nightmare = require('nightmare')

main().catch(console.error)

async function main() {
  const nightmare = Nightmare({ show: true })
  await nightmare.goto('https://segment.com')

  // look for and click on a node with the text "Help Center"
  await clickOnText(nightmare, 'Help Center')
  await nightmare.wait('body')

  await nightmare.end()
}

// mostly based on: https://stackoverflow.com/a/37098784
function clickOnText(nightmare, text) {
  return nightmare.evaluate(text => {
    var nodes = []

    var filter = {
      acceptNode: function(node) {
        // look for nodes that are text_nodes and include the following string.
        if (
          node.nodeType === document.TEXT_NODE &&
          node.nodeValue.includes(text)
        ) {
          return NodeFilter.FILTER_ACCEPT
        }
        return NodeFilter.FILTER_REJECT
      }
    }

    var walker = document.createTreeWalker(
      document.documentElement,
      NodeFilter.SHOW_TEXT,
      filter,
      false
    )

    // find the node
    while (walker.nextNode()) {
      //give me the element containing the node
      nodes.push(walker.currentNode.parentNode)
    }
    console.log(nodes.length)
    // click on the first node
    if (nodes.length) {
      nodes[0].click()
    }
  }, text)
}
