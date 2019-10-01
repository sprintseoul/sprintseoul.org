import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import VisibilitySensor from "react-visibility-sensor";
import Logo from "../../images/svg/sprintseoul-black-wide.svg";


class Header extends React.Component {
  state = {
    fixed: false
  };

  visibilitySensorChange = val => {
    if (val) {
      this.setState({ fixed: false });
    } else {
      this.setState({ fixed: true });
    }
  };

  getHeaderSize = () => {
    const fixed = this.state.fixed ? "fixed" : "";
    const homepage = this.props.path === "/" ? "homepage" : "";

    return `${fixed} ${homepage}`;
  };

  render() {
    const { pages, path, theme } = this.props;
    const { fixed } = this.state;

    return (
      <React.Fragment>
        <header className={`header ${this.getHeaderSize()}`}>
          <Link to="/" className="logo">
            <Logo />
          </Link>
        </header>
        <VisibilitySensor onChange={this.visibilitySensorChange}>
          <div className="sensor" />
        </VisibilitySensor>

        {/* --- STYLES --- */}
        <style jsx>{`
          .header {
            align-items: center;
            background-color: ${theme.color.neutral.white};
            display: flex;
            height: ${theme.header.height.fixed};
            position: relative;
            padding: 0 ${theme.space.m};
            width: 100%;

            &.homepage {
              position: absolute;
              background-color: transparent;
            }
          }

          :global(.logo) {
            margin-top: 2px;
            width: 100px;
            border: 0;
          }

          .sensor {
            display: block;
            position: absolute;
            bottom: 0;
            z-index: 1;
            left: 0;
            right: 0;
            height: 1px;
            top: ${path === "/" ? theme.header.height.homepage : theme.header.height.default};
          }

          @from-width desktop {
            .header {
              &.fixed {
                height: ${theme.header.height.fixed};
                background-color: ${theme.color.neutral.white};
                left: 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 1;
              }

              &.homepage:not(.fixed) {
              }
            }
          }
        `}</style>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  pages: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Header;
