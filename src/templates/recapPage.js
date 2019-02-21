import React from "react";
import { graphql, Link } from "gatsby";

import theme from "../theme";
import Layout from "../components/Layout";
import StyledLink from "../components/StyledLink";
import ImageLink from "../components/ImageLink";

export default ({ data, pageContext, ...otherProps }) => {
  console.log({ otherProps });
  const post = data.markdownRemark;
  const index = data.index;
  console.log({ index, pageContext });
  return (
    <Layout>
      <div>
        {index && (
          <div
            css={{
              backgroundColor: theme.colors.paperDark,
              padding: `${theme.spacing * 2}px ${theme.spacing * 4}px`,
              margin: `${theme.spacing * -4}px ${theme.spacing *
                -4}px ${theme.spacing * 4}px ${theme.spacing * -4}px`
            }}
          >
            <StyledLink to={index.fields.pagePath} variant="text">
              {index.fields.campaignTitle}
            </StyledLink>
          </div>
        )}
        <h1>{post.fields.pageTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "200px 1fr 200px"
          }}
        >
          <div>
            {pageContext.previous && (
              <>
                <div css={{ marginBottom: theme.spacing * 2 }}>Předchozí</div>
                <ImageLink
                  pagePath={pageContext.previous.pagePath}
                  imageUri={pageContext.previous.imageUri}
                  key={pageContext.previous.pagePath}
                >
                  {pageContext.previous.pageTitle}
                </ImageLink>
              </>
            )}
          </div>
          <div />
          <div css={{ textAlign: "right" }}>
            {pageContext.next && (
              <>
                <div css={{ marginBottom: theme.spacing * 2 }}>Další</div>
                <ImageLink
                  pagePath={pageContext.next.pagePath}
                  imageUri={pageContext.next.imageUri}
                  key={pageContext.next.pagePath}
                >
                  {pageContext.next.pageTitle}
                </ImageLink>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!, $campaignTitle: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        pageTitle
      }
    }
    index: markdownRemark(
      fields: { campaignTitle: { eq: $campaignTitle }, isIndex: { eq: true } }
    ) {
      fields {
        campaignTitle
        pagePath
      }
    }
  }
`;
