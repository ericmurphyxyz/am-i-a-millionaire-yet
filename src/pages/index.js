import React, { Component } from "react"

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
        />
      </Layout>
    )
  }
}

export default IndexPage
