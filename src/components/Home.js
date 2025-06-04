import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import "./Home.css";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="home-wrapper">
      {/* Server Content Section */}
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <h1>Give Blood, Save Lives</h1>
        <p>Your donation can make a big difference</p>
        <button className="cta-button">Donate Now</button>
      </section>

      {/* Info Cards */}
      <section className="info-section">
        <div className="info-card">
          <h3>Benefits of Donation</h3>
          <p>Learn about the positive impact and health benefits of donating blood.</p>
        </div>
        <div className="info-card">
          <h3>Who Can Donate</h3>
          <p>Check if you meet the eligibility criteria to become a donor.</p>
        </div>
        <div className="info-card">
          <h3>How It Works</h3>
          <p>Understand the blood donation process in a few simple steps.</p>
        </div>
      </section>

      {/* Additional Information Grid */}
      <section className="grid-section">
        <h2 className="section-title">Learn More</h2>
        <div className="grid-cards">
          <div className="grid-card">
            <h4>Frequently Asked Questions</h4>
            <ul>
              <li>Am I eligible to donate?</li>
              <li>How often can I donate?</li>
              <li>Is it safe and hygienic?</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Types of Donations</h4>
            <ul>
              <li>Whole Blood</li>
              <li>Platelet Apheresis</li>
              <li>Plasma Donation</li>
            </ul>
          </div>
          <div className="grid-card">
            <h4>Preparation & Recovery</h4>
            <ul>
              <li>Before you donate</li>
              <li>What to expect</li>
              <li>Aftercare instructions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="accordion-section">
        <h2 className="section-title">Key Information</h2>
        <details>
          <summary>Is blood donation safe?</summary>
          <p>Yes, the donation process is safe and uses sterile, single-use equipment.</p>
        </details>
        <details>
          <summary>How long does it take?</summary>
          <p>The donation itself takes about 10–15 minutes, with extra time for rest and recovery.</p>
        </details>
        <details>
          <summary>What should I do before donating?</summary>
          <p>Stay hydrated, eat a healthy meal, and bring identification.</p>
        </details>
      </section>

      {/* Blog Preview Section */}
      <section className="blog-preview-section">
        <h2 className="section-title">From Our Blog</h2>
        <div className="grid-cards">
          <div className="grid-card">
            <h4><Link to="/blog/1">Why You Should Donate Blood</Link></h4>
            <p>Discover the life-saving impact of your donation.</p>
          </div>
          <div className="grid-card">
            <h4><Link to="/blog/2">Blood Donation Tips</Link></h4>
            <p>How to prepare for a safe and effective donation.</p>
          </div>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <Link to="/blog" className="cta-button">Read More Articles</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Blood Donation Initiative | Committed to saving lives with compassion and care.</p>
      </footer>
    </div>
  );
};

export default Home;
