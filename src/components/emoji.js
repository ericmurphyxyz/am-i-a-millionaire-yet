import React from "react"
import styled from "styled-components"

const EmojiWrapper = styled.span`
  font-weight: normal;
`

const Emoji = ({ symbol }) => (
  <EmojiWrapper role="img" aria-hidden="true">
    {symbol}
  </EmojiWrapper>
)

export default Emoji
