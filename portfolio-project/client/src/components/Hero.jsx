import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import "./Hero.css";
export default function Hero() {
  function scrollToContact() {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <section id="home" className="hero">
      <div className="glass hero-content">
        <div className="hero-text">
          <h1>Hello, I'm Pedro Bueno</h1>
          <p className="subtitle">
            Full-Stack Software Engineer passionate about creating beautiful,
            funcitonal web applications that solve real-world problems.
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary" onClick={scrollToContact}>
              View My Work
              <ArrowDown size={20} />
            </button>
            <button className="cta-button secondary" onClick={scrollToContact}>
              Get In Touch <Mail size={20} />
            </button>
          </div>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/buenocap"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/pedrobuenocastaneda/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="mailto:pedro.buenocastaneda@outlook.com"
            className="social-link"
            aria-label="Send Email"
          >
            <Mail size={24} />
          </a>
        </div>

        <div className="hero-decoration">
          <div className="floating-element"></div>
          <div className="floating-element"></div>
          <div className="floating-element"></div>
        </div>
      </div>
    </section>
  );
}
