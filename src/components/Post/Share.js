import React from "react";
import PropTypes from "prop-types";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share";

import config from "../../../content/meta/config";

const PostShare = props => {
  const {
    post: {
      fields: { slug },
      frontmatter: { title },
      excerpt
    },
    theme
  } = props;

  const url = config.siteUrl + config.pathPrefix + slug;

  const iconSize = 36;

  return (
    <React.Fragment>
      <div className="share">
        <span className="label">SHARE</span>
        <div className="links">
          <TwitterShareButton
            url={url}
            title={title}
          >
            <TwitterIcon round size={iconSize} />
          </TwitterShareButton>
          <FacebookShareButton
            url={url}
            quote={`${title} - ${excerpt}`}
          >
            <FacebookIcon round size={iconSize} />
          </FacebookShareButton>
          <LinkedinShareButton
            url={url}
            title={title}
            description={excerpt}
          >
            <LinkedinIcon round size={iconSize} />
          </LinkedinShareButton>
        </div>
      </div>

      {/* --- STYLES --- */}
      <style jsx>{`
        .share {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: ${theme.space.inset.l};
        }

        .links {
          display: flex;
          flex-direction: row;

          :global(.SocialMediaShareButton) {
            margin: 0 0.8em;
            cursor: pointer;
          }
        }

        .label {
          font-size: 1.2em;
          margin: 0 1em 1em;
        }

        @from-width tablet {
          .share {
            flex-direction: row;
          }
          .label {
            margin: ${theme.space.inline.m};
          }
        }
      `}</style>
    </React.Fragment>
  );
};

PostShare.propTypes = {
  post: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default PostShare;
