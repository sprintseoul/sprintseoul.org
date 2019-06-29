import PropTypes from "prop-types";
import React from "react";

import Item from "./Item";

const Past = props => {
  const { sprints, theme } = props;

  return (
    <React.Fragment>
      <main className="main">
        <h1>지난 스프린트</h1>
        <ul>
          {sprints.map(sprint => {
            const {
              node,
              node: {
                fields: { slug }
              }
            } = sprint;
            return <Item key={slug} sprint={node} theme={theme} />;
          })}
        </ul>
      </main>

      {/* --- STYLES --- */}
      <style jsx>{`
        .main {
          padding: 0 ${theme.space.inset.default};
        }

        h1 {
          margin: 0 auto;
          padding: ${`calc(${theme.space.default} * 2) 0 calc(${theme.space.default} * 0.5)`};
        }

        ul {
          list-style: none;
          margin: 0 auto;
          padding: 0;
        }

        @above tablet {
          .main {
            padding: 0 ${`0 calc(${theme.space.default} * 1.5)`};
          }
          ul {
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @above desktop {
          h1 {
            max-width: ${theme.text.maxWidth.desktop};
          }

          ul {
            max-width: ${theme.text.maxWidth.desktop};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Past.propTypes = {
  sprints: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default Past;
