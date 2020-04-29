import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Hero from "../components/Hero";
import Upcoming from "../components/Upcoming";
import Past from "../components/Past";
import Guide from "../components/Guide";
import Seo from "../components/Seo";

class IndexPage extends React.Component {
  separator = React.createRef();

  render() {
    const {
      data: {
        upcoming: { edges: upcoming = [] },
        past: { edges: past = [] },
        guide: { html: guideHTML },
        projects: { html: projectListHTML },
        background: { resize: { src: background } },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const showUpcoming = (sprints) => {
      if (sprints.length > 0) {
        return (
          <ThemeContext.Consumer>
            {theme => <Upcoming sprints={upcoming} theme={theme} />}
          </ThemeContext.Consumer>
        );
      }
      return;
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (<Hero background={background} theme={theme} />)}
        </ThemeContext.Consumer>

        {showUpcoming(upcoming)}

        <hr ref={this.separator} />

        <ThemeContext.Consumer>
          {theme => <Guide guide={guideHTML} projectList={projectListHTML} theme={theme} />}
        </ThemeContext.Consumer>

        <hr ref={this.separator} />

        <ThemeContext.Consumer>
          {theme => <Past sprints={past} theme={theme} />}
        </ThemeContext.Consumer>

        <Seo facebook={facebook} />

        <style jsx>{`
          hr {
            margin: 0;
            border: 0;
          }
        `}</style>
      </React.Fragment>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default IndexPage;

//eslint-disable-next-line no-undef
export const query = graphql`
  query IndexQuery {
    upcoming: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//sprints/[0-9]+.*/" }
        frontmatter: { category: { eq: "upcoming" } }
      }
      sort: { fields: [fields___slug], order: ASC }
    ) {
      edges {
        node {
          html
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
          }
        }
      }
    }
    past: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//sprints/[0-9]+.*/" }
        frontmatter: { category: { eq: "past" } }
      }
      sort: { fields: [fields___slug], order: DESC }
    ) {
      edges {
        node {
          html
          excerpt
          fields {
            slug
            prefix
          }
          frontmatter {
            title
            category
          }
        }
      }
    }
    guide: markdownRemark(fileAbsolutePath: { regex: "/guide/" }) {
      id
      html
    }
    projects: markdownRemark(fileAbsolutePath: { regex: "/project-list/" }) {
      id
      html
    }
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    background: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 1920, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
