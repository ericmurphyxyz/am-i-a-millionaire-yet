require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Am I a Millionaire Yet?`,
    description: `Check how many countries you're a millionaire in the local currency 🤑`,
    author: `@ericnmurphy`,
    url: `https://amiamillionaireyet.netlify.com`,
    image: `/images/twitter-card.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-fixer`,
      options: {
        access_key: process.env.FIXER_API_KEY,
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Am I a Millionaire Yet?`,
        short_name: `Millionaire`,
        start_url: `/`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
