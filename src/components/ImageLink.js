import React from "react";
import { Link } from "gatsby";
import theme from "../theme";

const ImageLink = ({ pagePath, imageUri, children }) => {
  return (
    <Link to={pagePath} key={pagePath} css={{ textDecoration: "none" }}>
      <div>
        <div
          css={{
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: theme.colors.paper,
            backgroundColor: theme.colors.stoneLight,
            backgroundImage: imageUri ? `url(${imageUri})` : "none",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            ":hover": {
              backgroundColor: theme.colors.stone,
              fontSize: theme.typography.h4.fontSize
            },
            textShadow: `0px 0px ${theme.spacing}px rgba(0,0,0,0.5);`,
            transition: "font-size 0.3s"
          }}
        >
          {children}
        </div>
      </div>
    </Link>
  );
};

export default ImageLink;
