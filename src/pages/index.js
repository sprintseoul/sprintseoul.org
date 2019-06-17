import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { ThemeContext } from "../layouts";
import Hero from "../components/Hero";
import Upcoming from "../components/Upcoming";
import Past from "../components/Past";
import Seo from "../components/Seo";

class IndexPage extends React.Component {
  separator = React.createRef();

  render() {
    const {
      data: {
        upcoming: { edges: upcoming = [] },
        past: { edges: past = [] },
        bgDesktop: {
          resize: { src: desktop }
        },
        bgTablet: {
          resize: { src: tablet }
        },
        bgMobile: {
          resize: { src: mobile }
        },
        site: {
          siteMetadata: { facebook }
        }
      }
    } = this.props;

    const backgrounds = {
      desktop,
      tablet,
      mobile
    };

    return (
      <React.Fragment>
        <ThemeContext.Consumer>
          {theme => (<Hero backgrounds={backgrounds} theme={theme} />)}
        </ThemeContext.Consumer>

        <hr ref={this.separator} />

        <ThemeContext.Consumer>
          {theme => <Upcoming sprints={upcoming} theme={theme} />}
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
      sort: { fields: [fields___prefix], order: DESC }
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
      sort: { fields: [fields___prefix], order: DESC }
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
    site {
      siteMetadata {
        facebook {
          appId
        }
      }
    }
    bgDesktop: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 1200, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgTablet: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 800, height: 1100, quality: 90, cropFocus: CENTER) {
        src
      }
    }
    bgMobile: imageSharp(fluid: { originalName: { regex: "/hero-background/" } }) {
      resize(width: 450, height: 850, quality: 90, cropFocus: CENTER) {
        src
      }
    }
  }
`;

//hero-background
