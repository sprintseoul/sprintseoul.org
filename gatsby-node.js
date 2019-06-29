//const webpack = require("webpack");
const _ = require("lodash");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const Promise = require("bluebird");

const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode });
    const fileNode = getNode(node.parent);
    const source = fileNode.sourceInstanceName;
    const separtorIndex = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;

    if (source !== "parts") {
      createNodeField({
        node,
        name: `slug`,
        value: `${separtorIndex ? "/" : ""}${slug.substring(shortSlugStart)}`
      });
    }
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : ""
    });
    createNodeField({
      node,
      name: `source`,
      value: source
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const sprintTemplate = path.resolve("./src/templates/SprintTemplate.js");

    // Do not create draft post files in production.
    let activeEnv = process.env.ACTIVE_ENV || process.env.NODE_ENV || "development"
    console.log(`Using environment config: '${activeEnv}'`)
    let filters = `filter: { fields: { slug: { ne: null } } }`;
    if (activeEnv == "production") filters = `filter: { fields: { slug: { ne: null } , prefix: { ne: null } } }`

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              ` + filters + `
              sort: { fields: [fields___prefix], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  id
                  fields {
                    slug
                    prefix
                    source
                  }
                  frontmatter {
                    title
                    category
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const items = result.data.allMarkdownRemark.edges;

        // Create category list
        const categorySet = new Set();
        items.forEach(edge => {
          const {
            node: {
              frontmatter: { category }
            }
          } = edge;

          if (category && category !== null) {
            categorySet.add(category);
          }
        });

        // Create sprints
        const sprints = items.filter(item => item.node.fields.source === "sprints");
        sprints.forEach(({ node }, index) => {
          const slug = node.fields.slug;
          const next = index === 0 ? undefined : sprints[index - 1].node;
          const prev = index === sprints.length - 1 ? undefined : sprints[index + 1].node;
          const source = node.fields.source;

          createPage({
            path: slug,
            component: sprintTemplate,
            context: {
              slug,
              prev,
              next,
              source
            }
          });
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }, options) => {
  switch (stage) {
    case `build-javascript`:
      actions.setWebpackConfig({
        plugins: [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "./report/treemap.html",
            openAnalyzer: true,
            logLevel: "error",
            defaultSizes: "gzip"
          })
        ]
      });
  }
};
