import React from 'react';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <h2>Learn Anytime, Anywhere</h2>
          <p>Discover courses that fit your schedule and goals.</p>
          <a href="#courses" className="btn">Explore Courses</a>
        </div>
        <div className="hero-image">
          <img src="https://via.placeholder.com/500x300?text=Hero+Image" alt="Students learning" />
        </div>
      </div>
    </section>
  );
}

export default Hero;