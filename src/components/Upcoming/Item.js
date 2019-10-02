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
      excerpt,
      fields: { slug }
    }
  } = props;

  return (
    <React.Fragment>
      <Post post={sprint} theme={theme} showHeader={false} showFooter={false} />
    </React.Fragment>
  );
};

Item.propTypes = {
  sprint: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Item;
