import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* HERO SECTION */}
      <section className="hero">
        <h1>B2B Tender Management Platform</h1>
        <p>
          Discover, publish, and apply to tenders. Connect with verified companies and grow your business efficiently.
        </p>
        <div className="hero-buttons">
          <a href="/register" className="btn primary">Get Started</a>
          <a href="/browse-tenders" className="btn outline">Browse Tenders</a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2>Platform Features</h2>
        <div className="features-grid">
          {[
            ["Company Profile Management", "Register and manage your company details.", "🏢"],
            ["Create & Publish Tenders", "Easily create and share tenders.", "📝"],
            ["Apply to Tenders", "Browse and apply to relevant tenders.", "📄"],
            ["Search Companies", "Find reliable business partners.", "🔍"],
            ["Company Details", "Explore company profiles and tenders.", "📊"],
            ["Secure & Verified", "Safe, verified, and encrypted.", "🔒"],
          ].map(([title, desc, icon], i) => (
            <div className="feature-card" key={i}>
              <div className="icon">{icon}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH CTA */}
      <section className="search-cta">
        <h2>Looking for a Company or Product?</h2>
        <p>Search thousands of verified companies by name, industry or services.</p>
        <a href="/search" className="btn primary">Search Companies</a>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} B2B Tender Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
