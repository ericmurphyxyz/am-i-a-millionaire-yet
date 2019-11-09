import React, { Component } from "react"
import styled from "styled-components"

const InputLabel = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`

const InputWrapper = styled.div`
  display: flex;
`

const InputPrepend = styled.div`
  display: flex;
  margin-right: -1px;

  span {
    display: flex;
    align-items: center;
    padding: 0.15rem 0.5rem;
    background-color: #e9ecef;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

const NumberInput = styled.input`
  padding: 0.15rem 0.375rem;
  margin-right: 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`

const Button = styled.button`
  padding: 0.15rem 0.75rem;
  color: #fff;
  background-color: #6c757d;
  border: 1px solid #6c757d;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

  &:hover {
    background-color: #5a6268;
    border-color: #5a6268;
  }
`

class Input extends Component {
  render() {
    const { inputValue, handleInputChange, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <InputLabel htmlFor="net-worth">What's your net worth?</InputLabel>
        <InputWrapper>
          <InputPrepend>
            <span>$</span>
          </InputPrepend>
          <NumberInput
            type="number"
            id="net-worth"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button type="submit">Calculate</Button>
        </InputWrapper>
      </form>
    )
  }
}

export default Input
