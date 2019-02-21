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
    const {
      title: pageTitle,
      campaign: campaignTitle,
      imageUri: imageUri
    } = node.frontmatter;
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
    createNodeField({ node, name: `imageUri`, value: imageUri });
    createNodeField({ node, name: `pagePath`, value: pagePath });
    createNodeField({ node, name: `isIndex`, value: isIndex });
  }
};

const getNodeContext = ({
  fields: {
    pageSlug,
    pageTitle,
    campaignSlug,
    campaignTitle,
    imageUri,
    pagePath,
    isIndex = false
  } = {}
} = {}) => ({
  pageSlug,
  pageTitle,
  campaignSlug,
  campaignTitle,
  imageUri,
  pagePath,
  isIndex
});

const createRecapPages = (graphql, createPage) => {
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { isIndex: { eq: false } } }
        sort: { fields: fields___pageTitle, order: ASC }
      ) {
        group(field: fields___campaignTitle) {
          edges {
            node {
              fields {
                slug
                pageTitle
                pageSlug
                campaignTitle
                campaignSlug
                imageUri
                pagePath
                isIndex
              }
            }
          }
        }
      }
    }
  `).then(result => {
    const groups =
      (result && result.data && result.data.allMarkdownRemark.group) || [];
    return groups.forEach(group => {
      group.edges.forEach(({ node }, nodeIndex, nodes) => {
        const { pagePath, slug } = node.fields;
        const nextNode = nodes[nodeIndex + 1];
        const previousNode = nodes[nodeIndex - 1];

        const next = nextNode ? getNodeContext(nextNode.node) : null;
        const previous = previousNode
          ? getNodeContext(previousNode.node)
          : null;
        const context = getNodeContext(node);
        console.log({ slug, context, node });

        createPage({
          path: pagePath,
          component: path.resolve(`./src/templates/recapPage.js`),
          context: {
            ...getNodeContext(node),
            slug,
            next,
            previous
          }
        });
      });
    });
  });
};

const createCampaignIndexePages = (graphql, createPage) => {
  return graphql(`
    {
      allMarkdownRemark(
        filter: { fields: { isIndex: { eq: true } } }
        sort: { fields: fields___campaignTitle, order: ASC }
      ) {
        group(field: fields___campaignTitle) {
          edges {
            node {
              fields {
                slug
                campaignTitle
                campaignSlug
                imageUri
                pagePath
                isIndex
              }
            }
          }
        }
      }
    }
  `).then(result => {
    const groups =
      (result && result.data && result.data.allMarkdownRemark.group) || [];
    return groups.forEach(group => {
      group.edges.forEach(({ node }, nodeIndex, nodes) => {
        const { pagePath, slug } = node.fields;

        const context = getNodeContext(node);
        console.log({ slug, context, node });

        createPage({
          path: pagePath,
          component: path.resolve(`./src/templates/campaignIndex.js`),
          context: {
            ...getNodeContext(node),
            slug
          }
        });
      });
    });
  });
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  console.log("createPages");

  return Promise.all(
    createRecapPages(graphql, createPage),
    createCampaignIndexePages(graphql, createPage)
  );
};
