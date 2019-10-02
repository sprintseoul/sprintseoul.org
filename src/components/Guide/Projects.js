import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import Bodytext from "../Article/Bodytext";

const Projects = props => {
  const { projects, theme } = props;

  return (
    <React.Fragment>
      <div className="projectList" dangerouslySetInnerHTML={{ __html: projects }} />

      {/* --- STYLES --- */}
      <style jsx>{`
        .projectList {
          padding: 0 1em 0 1em;

          :global(ul) {
            list-style: none;
            margin: 0 0 1.5em;
            padding: 0 0 0 1.5em;
          }
          :global(li) {
            line-height: 1.5;
            border: 1px solid #d6d6d6;
            border-radius: ${theme.size.radius.default};
            margin: 0 0 15px 0;
            padding: 8px 16px;
          }
          :global(ul ul) {
            list-style: circle;
            margin: 0;
            padding: 0 0 0.25em 1.5em;
          }
          :global(li li) {
            line-height: 1.5;
            border: none;
            margin: 0 0 0.25em;
            padding: 0;
          }
          :global(strong) {
            font-weight: ${theme.font.weight.bold};
            font-size: ${theme.font.size.m};
            margin: 0 0 0.25em;
          }
          :global(span) {
            background-color: ${theme.color.brand.primary};
            border-radius: ${theme.size.radius.default};
            font-size: ${theme.font.size.xxs};
            padding: 2px 8px;
            margin-left: 4px;
            float: right;
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Projects.propTypes = {
  projects: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Projects;
