import React from "react";
import PropTypes from "prop-types";
import "prismjs/themes/prism-okaidia.css";

import asyncComponent from "../AsyncComponent";
import Headline from "../Article/Headline";
import Bodytext from "../Article/Bodytext";
import NextPrev from "./NextPrev";

const Share = asyncComponent(() =>
  import("./Share")
    .then(module => {
      return module.default;
    })
    .catch(error => {})
);

const Post = props => {
  const {
    post,
    post: {
      html,
      fields: { prefix, slug },
      frontmatter: { title }
    },
    next: nextPost,
    prev: prevPost,
    theme,
    showHeader = true,
    showFooter = true
  } = props;

  let header
  let footer;

  if (showHeader) {
    header = (
      <header>
        <Headline title={title} theme={theme} />
      </header>
    );
  }

  if (showFooter) {
    footer = (
      <footer>
        <Share post={post} theme={theme} />
        <NextPrev next={nextPost} prev={prevPost} theme={theme} />
      </footer>
    );
  }

  return (
    <React.Fragment>
      {header}
      <Bodytext html={html} theme={theme} />
      {footer}
    </React.Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
  theme: PropTypes.object.isRequired,
  showHeader: PropTypes.bool,
  showFooter: PropTypes.bool
};

export default Post;
