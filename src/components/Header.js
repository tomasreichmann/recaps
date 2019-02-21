import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import theme from "../theme";

const Header = ({ siteTitle, siteDescription, classes }) => (
  <header
    css={{
      background: theme.colors.woodDark,
      color: theme.colors.textInverse,
      marginBottom: theme.spacing * 4,
      padding: theme.spacing * 4,
      ...theme.typography.body
    }}
  >
    <h1 css={{ margin: 0 }}>
      <Link
        to="/"
        css={{
          color: `white`,
          textDecoration: `none`
        }}
      >
        {siteTitle}
      </Link>
    </h1>
    <div>{siteDescription}</div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;
