import PropTypes from "prop-types";
import React from "react";
import { graphql, StaticQuery } from "gatsby";

import Footer from "../components/Footer/";
import Header from "../components/Header";
import theme from "../theme/theme.yaml";

export const ThemeContext = React.createContext(null);

class Layout extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            footnote: markdownRemark(fileAbsolutePath: { regex: "/footnote/" }) {
              id
              html
            }
          }
        `}
        render={data => {
          const { children } = this.props;
          const {
            footnote: { html: footnoteHTML }
          } = data;

          return (
            <ThemeContext.Provider value={theme}>
              <React.Fragment>
                <Header path={this.props.location.pathname} theme={theme} />
                <main>{children}</main>
                <Footer html={footnoteHTML} theme={theme} />
                <style jsx>{`
                  :global(body) {
                    margin: 0;
                  }

                  main {
                    :global(h1),
                    :global(h2),
                    :global(h3) {
                      margin: 1.5em 0 1em;
                      word-break: keep-all;
                    }
                    :global(h2) {
                      line-height: ${theme.font.lineHeight.s};
                      font-size: ${theme.font.size.l};
                    }
                    :global(h3) {
                      font-size: ${theme.font.size.m};
                      line-height: ${theme.font.lineHeight.m};
                    }
                    :global(p) {
                      font-size: ${theme.font.size.s};
                      line-height: ${theme.font.lineHeight.xxl};
                      margin: 0 0 1.5em;
                    }
                    :global(ul) {
                      list-style: circle;
                      margin: 0 0 1.5em;
                      padding: 0 0 0 1.5em;
                    }
                    :global(li) {
                      font-size: ${theme.font.size.s};
                      margin: 0.7em 0;
                      line-height: 1.5;
                    }
                    :global(a) {
                      color: ${theme.color.standard.link};
                      text-decoration: none;
                      border-bottom: 1px solid ${theme.color.standard.link};
                    }
                    :global(a:hover) {
                      color: ${theme.color.standard.hover};
                      border-bottom: 1px solid ${theme.color.standard.hover};
                    }
                    :global(a:visited) {
                      color: ${theme.color.standard.visited};
                      border-color: ${theme.color.standard.visited};
                    }
                    :global(a.gatsby-resp-image-link) {
                      border: 0;
                      display: block;
                      margin: 2.5em 0;
                      border-radius: ${theme.size.radius.default};
                      overflow: hidden;
                      border: 1px solid ${theme.line.color};
                    }
                    :global(code.language-text) {
                      background: ${theme.color.neutral.gray.c};
                      text-shadow: none;
                      color: inherit;
                      padding: 0.1em 0.3em 0.2em;
                      border-radius: 0.1em;
                    }
                  }
                `}</style>
              </React.Fragment>
            </ThemeContext.Provider>
          );
        }}
      />
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default Layout;
