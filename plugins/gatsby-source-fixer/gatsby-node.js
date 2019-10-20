const fetch = require("node-fetch")
const queryString = require("query-string")

exports.sourceNodes = (
    { actions, createNodeId, createContentDigest },
    configOptions
) => {
    const { createNode } = actions

    // Gatsby adds a configOption that's not needed for this plugin, delete it
    delete configOptions.plugins

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
            // Process the JSON data into a node
            .then(({ rates }) => {
                // For each query result
                Object.keys(rates).forEach(rate => {
                    console.log(`${rate} rate is:`, rates[rate])
                })
            })
    )
}