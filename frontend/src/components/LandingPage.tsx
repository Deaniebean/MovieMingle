/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./LandingPage.css";
import '../styles/globals.css';
import hamburgerMenuIcon from "../assets/solar_hamburger-menu-linear.png";
import refineYourChoiceIcon from "../assets/RefineYourChoice.png";
import makeYourChoiceIcon from "../assets/MakeYourChoice.png";
import enjoyYourChoiceIcon from "../assets/EnjoyYourChoice.png";
import mobileImage from "../assets/MobileImage.png";
import { useNavigate } from "react-router-dom";

interface LogoProps {
  src: string;
  alt: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt }) => (
  <img loading="lazy" src={src} alt={alt} />
);

interface FeatureProps {
  src: string;
  alt: string;
  text: string;
}

interface LandingPageProps {
  setShowNavbar: (value: boolean) => void;
}

const Feature: React.FC<FeatureProps> = ({ src, alt, text }) => (
  <div className="feature">
    <img loading="lazy" src={src} alt={alt} />
    <div className="feature-text">{text}</div>
  </div>
);

const features: FeatureProps[] = [
  {
    src: refineYourChoiceIcon,
    alt: "Refine your choice icon",
    text: "1. Refine your choice.",
  },
  {
    src: makeYourChoiceIcon,
    alt: "Make your choice icon",
    text: "2. Make your choice.",
  },
  {
    src: enjoyYourChoiceIcon,
    alt: "Enjoy your choice icon",
    text: "3. Enjoy your choice.",
  },
];

const LandingPage: React.FC<LandingPageProps> = ({ setShowNavbar }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    setShowNavbar(true);
  }, []);

  function nextPage() {
    navigate("/select");
  }

  return (
    <div className="landing-page">
      <header className="header-container">
        <div className="burger-menu">
          <img src={hamburgerMenuIcon} alt="Hamburger Menu" />
        </div>
        <h1 className="logo">MovieMingle</h1>
        <div className="app-logo">
          <Logo src="your-app-logo-src" alt="App Logo" />
        </div>
      </header>
      <p className="text">
        Whether you're in the mood for action or comedy, drama or romance, the unique <span className="font-semibold">'This or That' feature</span> helps you find the perfect pick for your next movie night!
      </p>

      <section className="features">
        {features.map((feature) => (
          <Feature key={feature.text} {...feature} />
        ))}
      </section>

      <img src={mobileImage} alt="Mobile Image" className="mobile-image" />

      <button className="buttonStart" onClick={nextPage}>
        Find your match now!
      </button>
    </div>
  );
};

export default LandingPage;
