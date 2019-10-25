import React, { Component } from "react"

class Input extends Component {
  render() {
    const { inputValue, handleInputChange, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <label>
          <strong>What's your net worth?</strong>
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
        <button type="submit">Calculate</button>
      </form>
    )
  }
}

export default Input
