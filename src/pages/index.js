import React, { Component } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Input from "../components/input"

class IndexPage extends Component {
  state = {
    netWorth: 1000,
  }
  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <h1>Am I a Millionaire Yet? 🤑</h1>
        <p>
          Enter your net worth in USD 🇺🇸 and find out when you'll be a
          millionaire in currencies all over the world 🌏
        </p>
        <Input
          netWorth={this.state.netWorth}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        {this.props.data.allFixerRate.edges.map(edge => {
          const {
            emoji,
            currencyName,
            currencyId,
            rate,
            countryName,
          } = edge.node
          const { netWorth } = this.state

          return (
            <li key={currencyId}>
              {emoji} {rate * netWorth} {currencyId} in {countryName} (
              {currencyName})
            </li>
          )
        })}
      </Layout>
    )
  }
}

export const query = graphql`
  query RatesQuery {
    allFixerRate(sort: { fields: [rate], order: DESC }) {
      edges {
        node {
          emoji
          currencyName
          currencyId
          rate
          countryName
        }
      }
    }
  }
`

export default IndexPage
