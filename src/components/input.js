import React, { Component } from "react"

class Input extends Component {
  render() {
    const { netWorth, handleInputChange } = this.props
    return (
      <form>
        <label>
          <strong>What's your net worth?</strong>
          <input
            type="text"
            name="netWorth"
            value={netWorth}
            onChange={handleInputChange}
          />
        </label>
      </form>
    )
  }
}

export default Input
