import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

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
          {recaps.map(recap => (
            <div key={recap.node.fields.pagePath}>
              <Link
                to={recap.node.fields.pagePath}
                key={recap.node.fields.pagePath}
              >
                {recap.node.fields.pageTitle}
              </Link>
            </div>
          ))}
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
          }
        }
      }
    }
  }
`;
