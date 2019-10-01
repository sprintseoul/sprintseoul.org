import React from "react";
import PropTypes from "prop-types";
import Logo from "../../images/svg/sprintseoul-bw.svg";

console.log(Logo);

const Hero = props => {
  const { backgrounds, theme } = props;

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
          background-image: url(${backgrounds.mobile});
          background-size: cover;
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

        @from-width tablet {
          .hero {
            background-image: url(${backgrounds.tablet});
          }
        }

        @from-width desktop {
          .hero {
            background-image: url(${backgrounds.desktop});
          }
        }
      `}</style>
    </React.Fragment>
  );
};

Hero.propTypes = {
  backgrounds: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default Hero;
