import React, { Component } from "react"
import styled from "styled-components"

const InputLabel = styled.label`
  display: block;
  font-weight: bold;
`

class Input extends Component {
  render() {
    const { inputValue, handleInputChange, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="net-worth">What's your net worth?</InputLabel>
        <input
          type="number"
          id="net-worth"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Calculate</button>
      </form>
    )
  }
}

export default Input
