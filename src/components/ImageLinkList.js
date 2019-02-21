import React from "react";
import theme from "../theme";

const ImageLinkList = ({ children, itemMinWidth = 200 }) => {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(${itemMinWidth}px, 1fr))`,
        marginBottom: theme.spacing * 4
      }}
    >
      {children}
    </div>
  );
};

export default ImageLinkList;
