import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/Seo";
import StyledLink from "../components/StyledLink";
import ImageLinkList from "../components/ImageLinkList";
import ImageLink from "../components/ImageLink";

const IndexPage = ({ data }) => {
  const campaigns = data.campaigns.edges;
  console.log({ campaigns });
  return (
    <Layout>
      <SEO title="Recapy" keywords={[`recaps`, `application`, `react`]} />
      <h1>Kampaně</h1>
      <ImageLinkList>
        {campaigns.map(({ node: { fields: campaign } }) => (
          <ImageLink pagePath={campaign.pagePath} imageUri={campaign.imageUri}>
            {campaign.campaignTitle}
          </ImageLink>
        ))}
      </ImageLinkList>
      <StyledLink to="/theme">Téma</StyledLink>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    campaigns: allMarkdownRemark(
      filter: { fields: { isIndex: { eq: true } } }
    ) {
      edges {
        node {
          fields {
            campaignTitle
            pagePath
            imageUri
          }
        }
      }
    }
  }
`;
