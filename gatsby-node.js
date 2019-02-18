/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`);
const slugify = require(`slugify`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const isIndex = !!(
      node && node.fileAbsolutePath.split("/").reverse()[0] === "index.md"
    );
    console.log({ slug, isIndex });
    const { title: pageTitle, campaign: campaignTitle } = node.frontmatter;
    const campaignSlug = campaignTitle
      ? slugify(campaignTitle.toLowerCase())
      : null;

    const pageSlugFragment = [];
    if (campaignSlug) {
      pageSlugFragment.push(campaignSlug);
    }
    const pageSlug = pageTitle ? slugify(pageTitle.toLowerCase()) : null;

    if (pageSlug) {
      pageSlugFragment.push(pageSlug);
    }
    const pagePath = `/${pageSlugFragment.join("/")}/`;
    createNodeField({ node, name: `slug`, value: slug });
    createNodeField({ node, name: `pageTitle`, value: pageTitle });
    createNodeField({ node, name: `pageSlug`, value: pageSlug });
    createNodeField({ node, name: `campaignTitle`, value: campaignTitle });
    createNodeField({ node, name: `campaignSlug`, value: campaignSlug });
    createNodeField({ node, name: `pagePath`, value: pagePath });
    createNodeField({ node, name: `isIndex`, value: isIndex });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              pageTitle
              pageSlug
              campaignTitle
              campaignSlug
              pagePath
              isIndex
            }
          }
        }
      }
    }
  `).then(result => {
    result &&
      result.data &&
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const {
          pageSlug,
          pageTitle,
          campaignSlug,
          campaignTitle,
          pagePath,
          isIndex
        } = node.fields;
        console.log({
          pageSlug,
          pageTitle,
          campaignSlug,
          campaignTitle,
          pagePath,
          isIndex
        });
        if (!pageTitle && !isIndex) {
          return;
        }

        const template = isIndex ? "campaignIndex.js" : "recapPage.js";
        createPage({
          path: pagePath,
          component: path.resolve(`./src/templates/${template}`),
          context: {
            slug: node.fields.slug,
            pageSlug,
            pageTitle,
            campaignSlug,
            campaignTitle,
            pagePath,
            isIndex
          }
        });
      });
  });
};
