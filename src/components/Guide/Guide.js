import PropTypes from "prop-types";
import React from "react";

import Bodytext from "../Article/Bodytext";
import Projects from "./Projects";

const Guide = props => {
  const { guide, projectList, theme } = props;

  return (
    <React.Fragment>
      <main className="main">
        <Bodytext html={guide} theme={theme} />
        <Projects projects={projectList} theme={theme} />
      </main>

      {/* --- STYLES --- */}
      <style jsx>{`
        .main {
          padding: 0 ${theme.space.inset.default};
          margin: 0 auto;
        }

        @above tablet {
          .main {
            padding: 0 ${`0 calc(${theme.space.default} * 1.5)`};
            max-width: ${theme.text.maxWidth.tablet};
          }
        }
        @above desktop {
          .main {
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
