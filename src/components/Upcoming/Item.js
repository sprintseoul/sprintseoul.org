import { FaCalendar } from "react-icons/fa/";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Post from "../Post";

const Item = props => {
  const {
    theme,
    sprint,
    sprint: {
      html,
      frontmatter: {
        title
      },
      excerpt,
      fields: { slug }
    }
  } = props;

  return (
    <React.Fragment>
      <Link to={slug} key={slug} className="link"><h1>{title}</h1></Link>
      <Post post={sprint} theme={theme} showHeader={false} showFooter={false} />
      {/* --- STYLES --- */}
      <style jsx>{`
        .main {
          padding: 0 ${theme.space.inset.default};
        }

        h1 {
          font-size: ${theme.font.size.xxl};
          margin: 0 auto;
          padding: ${`calc(${theme.space.default} * 2) 0 calc(${theme.space.default} * 0.5)`};
        }
      `}</style>
    </React.Fragment>
  );
};

Item.propTypes = {
  sprint: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Item;
