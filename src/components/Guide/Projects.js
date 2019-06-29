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

          :global(h1),
          :global(h2),
          :global(h3) {
            margin: 1.5em 0 1em;
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
            list-style: none;
            margin: 0 0 1.5em;
            padding: 0 0 0 1.5em;
          }
          :global(li) {
            margin: 0.7em 0;
            line-height: 1.5;
            border: 1px solid #d6d6d6;
            border-radius: ${theme.size.radius.default};
            margin: 0 0 5px 0;
            padding: 10px;
            position: relative;
          }
          :global(ul ul) {
            list-style: circle;
            margin: 0;
            padding: 0 0 0 1.5em;
          }
          :global(li li) {
            margin: 0.7em 0;
            line-height: 1.5;
            border: none;
            margin: 0;
            padding: 0;
            position: relative;
          }
          :global(a) {
            font-weight: ${theme.font.weight.bold};
            color: ${theme.color.brand.primary};
            text-decoration: underline;
          }
          :global(strong) {
            display: block;
            font-size: 1.3em;
          }
          :global(span) {
            background-color: ${theme.color.brand.primary};
            border-radius: ${theme.size.radius.default};
            padding: 3px 5px;
            margin-left: 3px;
            float: right;
          }
        }

        li {
          background-color: black;
          border: 1px solid transparent;
          border-radius: ${theme.size.radius.default};
          margin: ${`calc(${theme.space.default} * 2) 0 calc(${theme.space.default} * 3)`};
          padding: ${theme.space.inset.s};
          position: relative;
          transition: all ${theme.time.duration.default};
          background: transparent;

          &::after {
            border-top: 1px solid ${theme.line.color};
            content: "";
            height: 0;
            position: absolute;
            bottom: ${`calc(${theme.space.default} * -1.5)`};
            left: 50%;
            transform: translateX(-50%);
            transition: all ${theme.time.duration.default};
            width: 50%;
          }

          &:first-child {
            &::before {
              border-top: 1px solid ${theme.line.color};
              content: "";
              height: 0;
              position: absolute;
              top: ${`calc(${theme.space.default} * -1.5)`};
              left: 50%;
              transform: translateX(-50%);
              transition: all ${theme.time.duration.default};
              width: 50%;
            }
          }
        }

        @from-width tablet {
          li {
            margin: ${`calc(${theme.space.default} * 3) 0 calc(${theme.space.default} * 4)`};
            padding: ${theme.space.default};

            &::after {
              bottom: ${`calc(${theme.space.default} * -2)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${theme.space.default} * -1.75)`};
              }
            }
          }
        }
        @from-width desktop {
          li {
            margin: ${`calc(${theme.space.default} * 4) 0 calc(${theme.space.default} * 5)`};
            padding: 0 0 ${`calc(${theme.space.default} * 2)`};

            &::after {
              bottom: ${`calc(${theme.space.default} * -1.5)`};
            }

            &:first-child {
              &::before {
                top: ${`calc(${theme.space.default} * -2.75)`};
              }
            }
          }

          li {
            &:hover {
              border: 1px solid ${theme.line.color};
              box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.03);

              &:after {
                bottom: ${`calc(${theme.space.default} * -2.5)`};
              }
              h1 {
                color: ${theme.blog.h1.hoverColor};
              }
            }
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired
};

export default Projects;
