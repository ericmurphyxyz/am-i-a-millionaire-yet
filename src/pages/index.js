import React, { Component } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Input from "../components/input"
import Emoji from "../components/emoji"

const CurrencyList = styled.ul`
  list-style: none;
  margin: 0;

  .millionaire {
    color: forestgreen;
  }
`

class IndexPage extends Component {
  state = {
    netWorth: 1000,
    inputValue: 0,
  }

  componentDidMount() {
    // Set inputValue to net worth as default
    this.setState({ inputValue: this.state.netWorth })
  }

  // Format number with commas for thousands
  formatNumber = number => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  handleInputChange = event => {
    const { value } = event.target
    this.setState({
      inputValue: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.setState({ netWorth: this.state.inputValue })
  }

  render() {
    const { data } = this.props
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
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        <CurrencyList>
          {data.allFixerRate.edges.map(edge => {
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
              <li
                class={conversion > 1000000 && "millionaire"}
                key={currencyId}
              >
                <Emoji symbol={emoji} />{" "}
                <strong>
                  {this.formatNumber(conversion)} {currencyId}
                </strong>{" "}
                in {countryName} ({currencyName})
              </li>
            )
          })}
        </CurrencyList>
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
