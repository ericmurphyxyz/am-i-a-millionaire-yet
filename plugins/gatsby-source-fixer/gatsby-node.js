const fetch = require("node-fetch")
const queryString = require("query-string")

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes currency/rate pairs to match Gatsby's node structure
  const processRate = (currency, rate, index) => {
    const node = { currency, rate }
    const nodeId = createNodeId(`fixer-rate-${index}`)
    const nodeContent = JSON.stringify(node)
    const nodeData = Object.assign({}, node, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `FixerRate`,
        content: nodeContent,
        contentDigest: createContentDigest(node),
      },
    })
    return nodeData
  }

  // Convert the options object into a query string
  const apiOptions = queryString.stringify(configOptions)
  // Join apiOptions with the Pixabay API URL
  const apiUrl = `http://data.fixer.io/api/latest?${apiOptions}`
  // Gatsby expects sourceNodes to return a promise
  return (
    // Fetch a response from the apiUrl
    fetch(apiUrl)
      // Parse the response as JSON
      .then(response => response.json())
      .then(({ rates }) => {
        Object.keys(rates).forEach((currency, index) => {
          // Covert each currency/rate pair to a Gatsby Node
          const nodeData = processRate(currency, rates[currency], index)
          // Use Gatsby's createNode helper to create a node from the node data
          createNode(nodeData)
        })
      })
  )
}
