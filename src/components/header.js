import PropTypes from "prop-types"
import React from "react"

import Emoji from "../components/emoji"

const Header = ({ siteTitle }) => (
  <header>
    <h1>
      {siteTitle} <Emoji symbol="🤑" />
    </h1>
    <p>
      Enter your net worth in USD <Emoji symbol="🇺🇸" /> and find out when you'll
      be a millionaire in currencies all over the world <Emoji symbol="🌏" />
    </p>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
