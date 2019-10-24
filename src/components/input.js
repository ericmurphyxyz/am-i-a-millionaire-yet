import React, { Component } from "react"

class Input extends Component {
  render() {
    const { netWorth, handleInputChange, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <label>
          <strong>What's your net worth?</strong>
          <input
            type="text"
            name="netWorth"
            value={netWorth}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Calculate</button>
      </form>
    )
  }
}

export default Input
