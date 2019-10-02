import React from "react";
import PropTypes from "prop-types";
import Logo from "../../images/svg/sprintseoul-bw.svg";

const Hero = props => {
  const { background, theme } = props;

  return (
    <React.Fragment>
      <section className="hero">
        <div className="slogan">
          <Logo style={{ filter: `invert(1)` }} />
          <h2>Go further together.</h2>
        </div>
      </section>

      {/* --- STYLES --- */}
      <style jsx>{`
        .hero {
          align-items: center;
          background: ${theme.hero.background};
          background-image: url(${background});
          background-size: cover;
          background-position: center;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          min-height: 60vh;
        }

        .slogan {
          margin-top: 100px;
          max-width: 80%;
        }

        h2 {
          color: ${theme.hero.h1.color};
          font-size: 3em;
          font-style: italic;
          margin-top: 20px;
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  background: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
