import PropTypes from "prop-types";
import React from "react";

import Bodytext from "../Article/Bodytext";
import Projects from "./Projects";

const Guide = props => {
  const { guide, projectList, theme } = props;

  return (
    <React.Fragment>
      <main className="main">
        <div>
          <Bodytext html={guide} theme={theme} />
          <Projects projects={projectList} theme={theme} />
        </div>
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

        div {
          margin: 0 auto;
          padding: 0;
        }

        @above tablet {
          .main {
            padding: 0 ${`0 calc(${theme.space.default} * 1.5)`};
          }
          div {
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @above desktop {
          h1 {
            max-width: ${theme.text.maxWidth.desktop};
          }

          div {
            max-width: ${theme.text.maxWidth.desktop};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Guide.propTypes = {
  guide: PropTypes.array.isRequired,
  projectList: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default Guide;
