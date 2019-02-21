import React from "react";
import PropTypes from "prop-types";
import Color from "color";
import { Link } from "gatsby";

import theme from "../theme";

const StyledLink = ({ children, variant = "primary", ...otherProps }) => (
  <Link
    css={{
      textDecoration: "underline",
      color: theme.colors[variant],
      ":hover": {
        color: Color(theme.colors[variant])
          .darken(0.2)
          .string(),
        textDecoration: "none"
      }
    }}
    {...otherProps}
  >
    {children}
  </Link>
);

StyledLink.propTypes = {
  children: PropTypes.node.isRequired
};

export default StyledLink;
