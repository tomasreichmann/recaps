import React from "react";
import PropTypes from "prop-types";
import theme from "../theme";
import Color from "color";

const Typography = ({ children, variant = "text" }) => (
  <span
    css={{
      color: theme.colors[variant]
    }}
  >
    {children}
  </span>
);

Typography.propTypes = {
  children: PropTypes.node.isRequired
};

export default Typography;
