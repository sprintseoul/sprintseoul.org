import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
require("prismjs/themes/prism-okaidia.css");

import Seo from "../components/Seo";
import Article from "../components/Article";
import Post from "../components/Post";
import { ThemeContext } from "../layouts";

const SprintTemplate = props => {
  const {
    data: {
      post,
      site: {
        siteMetadata: { facebook }
      }
    },
    pageContext: { next, prev }
  } = props;

  return (
    <React.Fragment>
      <ThemeContext.Consumer>
        {theme => (
          <Article theme={theme}>
            <Post
              post={post}
              next={next}
              prev={prev}
              theme={theme}
            />
          </Article>
        )}
      </ThemeContext.Consumer>

      <Seo data={post} facebook={facebook} />
    </React.Fragment>
  );
};

SprintTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export default SprintTemplate;

//eslint-disable-next-line no-undef
export const sprintQuery = graphql`
  query SprintBySlug($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        prefix
      }
      frontmatter {
        title
      }
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
  }
`;
