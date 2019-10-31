import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import SEO from "./seo"
import "./layout.css"

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;

  > section {
    padding: 20px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Layout = ({ children }) => (
  <>
    <SEO />
    <Wrapper>{children}</Wrapper>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
