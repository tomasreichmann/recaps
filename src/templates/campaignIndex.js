import React from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/Layout";
import ImageLinkList from "../components/ImageLinkList";
import ImageLink from "../components/ImageLink";

export default ({ data, ...otherProps }) => {
  console.log({ otherProps });
  const post = data.markdownRemark;
  const recaps = data.recaps.edges;
  console.log({ recaps });
  return (
    <Layout>
      <div>
        <h1>{post.fields.campaignTitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        <div>
          <ImageLinkList>
            {recaps.map(({ node: { fields: recap } }) => (
              <ImageLink pagePath={recap.pagePath} imageUri={recap.imageUri}>
                {recap.pageTitle}
              </ImageLink>
            ))}
          </ImageLinkList>
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
        campaignTitle
        imageUri
      }
    }
    recaps: allMarkdownRemark(
      filter: {
        fields: {
          campaignTitle: { eq: $campaignTitle }
          pageTitle: { ne: "" }
          isIndex: { eq: false }
        }
      }
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      edges {
        node {
          fields {
            pageTitle
            pagePath
            imageUri
          }
        }
      }
    }
  }
`;
