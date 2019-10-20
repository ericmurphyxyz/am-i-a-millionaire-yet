const fetch = require("node-fetch")
const queryString = require("query-string")

exports.sourceNodes = (
    { actions, createNodeId, createContentDigest },
    configOptions
) => {
    const { createNode } = actions

    // Gatsby adds a configOption that's not needed for this plugin, delete it
    delete configOptions.plugins

    // plugin code goes here...
    console.log("Testing my plugin", configOptions)
}