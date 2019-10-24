const path = require("path")
const fs = require("fs-extra")
const fetch = require("node-fetch")
const queryString = require("query-string")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes currency/rate pairs to match Gatsby's node structure
  const processRate = (rate, country, index) => {
    const node = {
      currency: country.currencyId,
      currencyName: country.currencyName,
      rate,
      emoji: country.emoji,
    }
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
  // Fetch a response from the apiUrl

  // get json countries data
  const countries = await fs.readJson(
    path.resolve(__dirname, "./countries.json")
  )
  const ratesResponse = await fetch(apiUrl)
  const { rates } = await ratesResponse.json()

  const usdRate = rates["USD"]

  Object.keys(countries).forEach((country, index) => {
    const currency = rates[country]
    const rateBaseUsd = currency / usdRate
    // Covert each currency/rate pair to a Gatsby Node
    const nodeData = processRate(rateBaseUsd, countries[country], index)
    // Use Gatsby's createNode helper to create a node from the node data
    createNode(nodeData)
  })
}
