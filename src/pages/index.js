import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

const IndexPage = ({ data }) => {
    const campaigns = data.campaigns.edges;
    console.log({ campaigns });
    return (
        <Layout>
            <SEO title="Home" keywords={[`recaps`, `application`, `react`]} />
            <h1>Campaigns</h1>
            {campaigns.map(campaign => (
                <div>
                    <Link
                        to={campaign.node.fields.pagePath}
                        key={campaign.node.fields.pagePath}
                    >
                        {campaign.node.fields.campaignTitle}
                    </Link>
                </div>
            ))}
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
                    }
                }
            }
        }
    }
`;
