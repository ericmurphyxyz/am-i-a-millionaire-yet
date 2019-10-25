import React from "react"

const Emoji = ({ symbol }) => (
  <span role="img" aria-hidden="true">
    {symbol}
  </span>
)

export default Emoji
