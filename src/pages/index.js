import React, { Component } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Input from "../components/input"
import Emoji from "../components/emoji"

class IndexPage extends Component {
  state = {
    netWorth: 1000,
  }

  // Format number with commas for thousands
  formatNumber = number => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
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
        <h1>
          Am I a Millionaire Yet? <Emoji symbol="🤑" />
        </h1>
        <p>
          Enter your net worth in USD <Emoji symbol="🇺🇸" /> and find out when
          you'll be a millionaire in currencies all over the world{" "}
          <Emoji symbol="🌏" />
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
          const conversion = rate * netWorth

          return (
            // Add class millionaire if over a million
            <li class={conversion > 1000000 && "millionaire"} key={currencyId}>
              <Emoji symbol={emoji} />{" "}
              <strong>
                {this.formatNumber(conversion)} {currencyId}
              </strong>{" "}
              in {countryName} ({currencyName})
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
