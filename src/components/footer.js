import PropTypes from "prop-types"
import React from "react"

const Footer = ({ buildTime }) => {
  // Get build time and extract the date from the ISO string
  const buildTimeISO = new Date(buildTime).toISOString()
  const buildDate = buildTimeISO.substring(0, buildTimeISO.indexOf("T"))

  return (
    <footer>
      <p>
        <small>
          Currency rates last updated {buildDate}. Made by{" "}
          <a
            href="https://ericnmurphy.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eric Murphy
          </a>
          . Check out the source code on{" "}
          <a
            href="http://github.com/ericnmurphy/am-i-a-millionaire-yet"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          !
        </small>
      </p>
    </footer>
  )
}

Footer.propTypes = {
  buildTime: PropTypes.string,
}

Footer.defaultProps = {
  buildTime: ``,
}

export default Footer
