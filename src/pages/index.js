import React, { Component } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import Header from "../components/header"
import Footer from "../components/footer"
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
    // Get number of currencies you're a millionaire in
    const millionaireCurrencies = data.allFixerRate.edges.filter(({ node }) => {
      return this.checkMillionaire(node.rate * this.state.netWorth)
    }).length

    return (
      <Layout>
        <section>
          <Header siteTitle={data.site.siteMetadata.title} />
          <Input
            inputValue={this.state.inputValue}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
          />
          <Footer buildTime={data.site.buildTime} />
        </section>
        <section>
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
        </section>
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
      siteMetadata {
        title
      }
    }
  }
`

export default IndexPage
