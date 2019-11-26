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

  // Helper function that processes currency/rates to match Gatsby's node structure
  const processRate = (rate, country) => {
    // Destructure from country object
    const { currencyId, currencyName, name: countryName, emoji } = country

    // Create gatsby node
    const node = {
      currencyId,
      currencyName,
      rate,
      countryName,
      emoji,
    }
    const nodeId = createNodeId(`fixer-rate-${currencyId}`)
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

  // Get countries from JSON
  const getCountries = () => {
    return fs.readJson(path.resolve(__dirname, "./countries.json"))
  }

  // Get rates as JSON from fixer.io
  const getRates = () => {
    // Get the API key from the options
    const apiOptions = queryString.stringify(configOptions)
    const apiUrl = `http://data.fixer.io/api/latest?${apiOptions}`

    return fetch(apiUrl).then(response => {
      return response.json()
    })
  }

  // Get countries and rates concurrently
  const [countries, { rates }] = await Promise.all([getCountries(), getRates()])

  // Get the USD rate because Fixer returns base EUR by default
  const usdRate = rates["USD"]

  Object.keys(countries).forEach(country => {
    // Get rate for the country and convert it to base USD
    const rate = rates[country]
    const rateBaseUsd = rate / usdRate

    // Convert each currency/rate to a Gatsby Node
    const nodeData = processRate(rateBaseUsd, countries[country])
    // Use Gatsby's createNode helper to create a node from the node data
    createNode(nodeData)
  })
}
