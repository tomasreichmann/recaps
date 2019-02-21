import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";
import theme from "../theme";
import Header from "./Header";

import "./Layout.css";

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <div
        key="page"
        css={{
          backgroundColor: theme.colors.paper,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Helmet
          link={[
            {
              href: "https://fonts.googleapis.com/css?family=Faustina",
              rel: "stylesheet"
            }
          ]}
        />
        <Header
          siteTitle={data.site.siteMetadata.title}
          siteDescription={data.site.siteMetadata.description}
        />
        <main
          css={{
            padding: theme.spacing * 4,
            paddingTop: 0,
            flex: "1 1 auto",
            ...theme.typography.body
          }}
        >
          {children}
        </main>
        <footer
          style={{
            background: theme.colors.stoneDark,
            color: theme.colors.textInverse,
            ...theme.typography.body,
            marginTop: theme.spacing * 4,
            padding: theme.spacing * 4,
            textAlign: "right"
          }}
        >
          © {new Date().getFullYear()}{" "}
          <a href="http://www.tomasreichmann.cz" style={{ color: "white" }}>
            Tomáš Reichmann
          </a>
        </footer>
      </div>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
