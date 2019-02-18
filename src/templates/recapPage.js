import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';

export default ({ data, ...otherProps }) => {
    console.log({ otherProps });
    const post = data.markdownRemark;
    const index = data.index;
    console.log({ index });
    return (
        <Layout>
            <div>
                {index && (
                    <div>
                        <Link to={index.fields.pagePath}>
                            {index.fields.campaignTitle}
                        </Link>
                    </div>
                )}
                <h1>{post.fields.pageTitle}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
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
            fields: {
                campaignTitle: { eq: $campaignTitle }
                isIndex: { eq: true }
            }
        ) {
            fields {
                campaignTitle
                pagePath
            }
        }
    }
`;
