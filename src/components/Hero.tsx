import "../App.css";
import logo from "../assets/logo.png";
import background from "../assets/background.png";
import ParticlesBackground from "./ParticlesBackground";

const Hero = ({ subtitle }: {
  subtitle: string;
}) => (
  <section className="hero-section" id="hero">
    <div className="hero-bg" />
    <div className="stars" />
    <div className="twinkle" />
    <ParticlesBackground />
    <div className="hero-bg-logo">
      <img src={logo} alt="ASHEN Marca de agua" />
    </div>
    <div className="hero-content">
      <h1 className="hero-title">ASHEN</h1>
      <div className="hero-software-row">
        <span className="hero-line-deco" />
        <span className="hero-software">software</span>
        <span className="hero-line-deco" />
      </div>
      <span className="hero-sub">{subtitle}</span>
    </div>
    <div className="hero-city">
      <img
        src={background}
        alt="Ciudad"
        style={{ width: "100vw", height: "100%", objectFit: "cover" }}
      />
    </div>
  </section>
);

export default Hero;
