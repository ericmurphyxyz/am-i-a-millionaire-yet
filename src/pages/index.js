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
    formSubmitted: false,
  }

  componentDidMount() {
    // Set inputValue to net worth as default
    this.setState({ inputValue: this.state.netWorth })
  }

  // Format number with commas for thousands
  formatNumber = number => {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
  }

  checkMillionaire = number => {
    return number >= 1000000
  }

  handleInputChange = event => {
    const { value } = event.target
    this.setState({
      inputValue: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    this.setState({
      netWorth: this.state.inputValue,
      formSubmitted: true,
    })
  }

  render() {
    const { data } = this.props
    // Get build time and extract the date from the ISO string
    const buildTimeISO = new Date(data.site.buildTime).toISOString()
    const buildTime = buildTimeISO.substring(0, buildTimeISO.indexOf("T"))
    // Get number of currencies you're a millionaire in
    const millionaireCurrencies = data.allFixerRate.edges.filter(({ node }) => {
      return this.checkMillionaire(node.rate * this.state.netWorth)
    }).length

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
        <p>
          <small>
            Currency rates last updated {buildTime}. Made by{" "}
            <a
              href="https://ericnmurphy.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Eric Murphy
            </a>
            . Check out the source code on{" "}
            <a
              href="http://github.com/ericnmurphy/am-i-a-millionaire-yet"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            !
          </small>
        </p>
        <Input
          inputValue={this.state.inputValue}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
        {this.state.formSubmitted && (
          <>
            <p>
              You're a millionaire in <strong>{millionaireCurrencies}</strong>{" "}
              currencies! 💸 If you converted your money, you'd have:
            </p>
            <CurrencyList>
              {data.allFixerRate.edges.map(({ node }) => {
                const {
                  emoji,
                  currencyName,
                  currencyId,
                  rate,
                  countryName,
                } = node
                const { netWorth } = this.state
                const conversion = rate * netWorth

                return (
                  // Add class millionaire if over a million
                  <li
                    className={
                      this.checkMillionaire(conversion) && "millionaire"
                    }
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
          </>
        )}
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
    site {
      buildTime
    }
  }
`

export default IndexPage
