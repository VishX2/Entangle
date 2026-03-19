import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Home = () => {
  const [isLight, setIsLight] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'light';
    } catch {
      return false;
    }
  });
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [counterAnimated, setCounterAnimated] = useState(false);
  const heroStatsRef = useRef(null);

  useEffect(() => {
    const theme = isLight ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
  }, [isLight]);

  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const currentScroll = window.pageYOffset;
      setNavbarScrolled(currentScroll > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.entangle-landing .reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { rootMargin: '0px', threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, []);

  useEffect(() => {
    const heroStats = heroStatsRef.current;
    if (!heroStats || counterAnimated) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setCounterAnimated(true);
      },
      { threshold: 0.3 }
    );
    observer.observe(heroStats);
    return () => observer.disconnect();
  }, [counterAnimated]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const loginSectionId = 'login';

  return (
    <div className={`entangle-landing ${isLight ? 'light-mode' : 'dark-mode'}`}>
      <button
        type="button"
        className="theme-toggle"
        onClick={() => setIsLight((v) => !v)}
        aria-label="Toggle theme"
      >
        <i className="fas fa-sun sun-icon" />
        <i className="fas fa-moon moon-icon" />
      </button>

      <nav className={`navbar ${navbarScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Entangle Logo" className="logo-img" />
            <span className="logo-text">Entangle</span>
          </Link>
          <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`} id="navLinks">
            <li><a href="#home" onClick={(e) => { scrollToSection(e, 'home'); setMobileMenuOpen(false); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { scrollToSection(e, 'about'); setMobileMenuOpen(false); }}>About</a></li>
            <li><a href="#features" onClick={(e) => { scrollToSection(e, 'features'); setMobileMenuOpen(false); }}>Features</a></li>
            <li><a href="#how-it-works" onClick={(e) => { scrollToSection(e, 'how-it-works'); setMobileMenuOpen(false); }}>How It Works</a></li>
            <li><a href="#contact" onClick={(e) => { scrollToSection(e, 'contact'); setMobileMenuOpen(false); }}>Contact</a></li>
          </ul>
          <div className={`nav-buttons ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>Startup Login</Link>
            <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMobileMenuOpen(false)}>Investor Login</Link>
            <Link to="/login" className="btn btn-primary btn-sm" onClick={() => setMobileMenuOpen(false)}>Entrepreneur Login</Link>
          </div>
          <button
            type="button"
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-video-container">
          <video autoPlay muted loop playsInline className="hero-video">
            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <h1 className="hero-title reveal-text">
            Connecting Startups & Investors with
            <span className="gradient-text"> AI Intelligence</span>
          </h1>
          <p className="hero-subtitle reveal-text">
            Smart AI-based ranking, matchmaking, verification, and communication system.
            Transform your fundraising journey with data-driven insights and verified connections.
          </p>
          <div className="hero-buttons reveal-text">
            <Link to="/select-type" className="btn btn-primary btn-lg">
              <i className="fas fa-rocket" /> Get started
            </Link>
            <a href="#about" className="btn btn-outline btn-lg" onClick={(e) => scrollToSection(e, 'about')}>
              <i className="fas fa-play-circle" /> Learn more
            </a>
          </div>
          <div className="hero-stats reveal-text" ref={heroStatsRef}>
            <div className="stat">
              <span className="stat-number" data-count="500">{counterAnimated ? '500' : '0'}</span>+
              <span className="stat-label">Startups</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-count="200">{counterAnimated ? '200' : '0'}</span>+
              <span className="stat-label">Investors</span>
            </div>
            <div className="stat">
              <span className="stat-number" data-count="50">{counterAnimated ? '50' : '0'}</span>M+
              <span className="stat-label">Funded</span>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="mouse" />
          <span>Scroll to explore</span>
        </div>
      </section>

      <section className="about" id="about">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">About Entangle</span>
            <h2 className="section-title">Revolutionizing <span className="gradient-text">Startup Funding</span></h2>
            <p className="section-subtitle">
              We bridge the gap between innovative startups and forward-thinking investors using cutting-edge AI technology.
            </p>
          </div>
          <div className="about-grid">
            <div className="about-card reveal">
              <div className="about-icon"><i className="fas fa-bullseye" /></div>
              <h3>Our Mission</h3>
              <p>To democratize startup funding by creating intelligent connections between entrepreneurs and investors, eliminating barriers and accelerating growth.</p>
            </div>
            <div className="about-card reveal">
              <div className="about-icon"><i className="fas fa-eye" /></div>
              <h3>Our Vision</h3>
              <p>A world where every promising startup finds the right investor, and every investor discovers their next unicorn through data-driven matching.</p>
            </div>
            <div className="about-card reveal">
              <div className="about-icon"><i className="fas fa-brain" /></div>
              <h3>Why AI?</h3>
              <p>Our AI analyzes thousands of data points to create perfect matches, predict success rates, and provide actionable insights for both parties.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features" id="features">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Platform Features</span>
            <h2 className="section-title"> Powerful Tools for <span className="gradient-text">Success</span></h2>
            <p className="section-subtitle">Everything you need to connect, evaluate, and grow.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: 'fa-user-plus', title: 'Startup Registration', text: 'Quick onboarding with comprehensive profile creation for startups.' },
              { icon: 'fa-building', title: 'Investor Registration', text: 'Secure registration with investment preferences and portfolio details.' },
              { icon: 'fa-lightbulb', title: 'Entrepreneur Portal', text: 'Dedicated space for entrepreneurs to showcase their innovations.' },
              { icon: 'fa-chart-line', title: 'AI-Based Ranking', text: 'Smart algorithms rank startups based on potential and compatibility.' },
              { icon: 'fa-heart', title: 'AI Matchmaking', text: 'Intelligent pairing of startups with ideal investors.' },
              { icon: 'fa-filter', title: 'Smart Filtering', text: 'Advanced search with industry, stage, and funding filters.' },
              { icon: 'fa-comments', title: 'Messaging System', text: 'Secure, real-time communication between matched parties.' },
              { icon: 'fa-shield-alt', title: 'Verification Module', text: 'Multi-layer verification for trust and authenticity.' },
              { icon: 'fa-layer-group', title: 'Three-Tier Architecture', text: 'Scalable, secure infrastructure for enterprise-grade performance.' },
            ].map((f, i) => (
              <div key={i} className="feature-card reveal">
                <div className="feature-icon"><i className={`fas ${f.icon}`} /></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Process</span>
            <h2 className="section-title">How <span className="gradient-text">Entangle</span> Works</h2>
            <p className="section-subtitle">Five simple steps to your perfect match.</p>
          </div>
          <div className="timeline">
            {[
              { num: '01', icon: 'fa-file-alt', title: 'Startup Submits Profile', text: 'Startups create detailed profiles with business plans, metrics, and funding requirements.' },
              { num: '02', icon: 'fa-sliders-h', title: 'Investor Sets Criteria', text: 'Investors define their investment preference, sectors, and deal size requirements.' },
              { num: '03', icon: 'fa-robot', title: 'AI Ranks & Matches', text: 'Our AI analyzes compatibility and creates optimal startup-investor pairings.' },
              { num: '04', icon: 'fa-handshake', title: 'Chat & Verification', text: 'Matched parties connect through secure messaging with verified identities.' },
              { num: '05', icon: 'fa-trophy', title: 'Deal Finalization', text: 'Successful matches proceed to negotiations and close funding deals.' },
            ].map((t, i) => (
              <div key={i} className="timeline-item reveal">
                <div className="timeline-number">{t.num}</div>
                <div className="timeline-content">
                  <div className="timeline-icon"><i className={`fas ${t.icon}`} /></div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="architecture">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Technology</span>
            <h2 className="section-title">System <span className="gradient-text">Architecture</span></h2>
            <p className="section-subtitle">Built on a robust three-tier architecture for maximum performance and security.</p>
          </div>
          <div className="architecture-diagram reveal">
            <div className="arch-tier">
              <div className="arch-icon"><i className="fas fa-desktop" /></div>
              <h3>Frontend Layer</h3>
              <p>React, Vite, Tailwind CSS</p>
            </div>
            <div className="arch-connector"><i className="fas fa-exchange-alt" /></div>
            <div className="arch-tier">
              <div className="arch-icon"><i className="fas fa-server" /></div>
              <h3>Backend Layer</h3>
              <p>Node.js, Express</p>
              <p>RESTful APIs, Prisma</p>
            </div>
            <div className="arch-connector"><i className="fas fa-exchange-alt" /></div>
            <div className="arch-tier">
              <div className="arch-icon"><i className="fas fa-database" /></div>
              <h3>Database Layer</h3>
              <p>PostgreSQL</p>
              <p>Prisma ORM</p>
            </div>
          </div>
        </div>
      </section>

      <section className="login-section" id={loginSectionId}>
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Get Started</span>
            <h2 className="section-title">Join <span className="gradient-text">Entangle</span> Today</h2>
            <p className="section-subtitle">Choose your portal and start your journey.</p>
          </div>
          <div className="login-grid">
            <div className="login-card reveal">
              <div className="login-icon startup"><i className="fas fa-rocket" /></div>
              <h3>Startup Login</h3>
              <p>Access your dashboard, manage your profile, and connect with investors.</p>
              <Link to="/login" className="btn btn-primary">
                <i className="fas fa-sign-in-alt" /> Login as startup
              </Link>
              <Link to="/register/startup" className="login-link">Don&apos;t have an account? Register</Link>
            </div>
            <div className="login-card featured reveal">
              <div className="featured-badge">Popular</div>
              <div className="login-icon investor"><i className="fas fa-building" /></div>
              <h3>Investor Login</h3>
              <p>Discover promising startups, set criteria, and make data-driven investment.</p>
              <Link to="/login" className="btn btn-primary">
                <i className="fas fa-sign-in-alt" /> Login as Investor
              </Link>
              <Link to="/register/investor" className="login-link">Don&apos;t have an account? Register</Link>
            </div>
            <div className="login-card reveal">
              <div className="login-icon entrepreneur"><i className="fas fa-lightbulb" /></div>
              <h3>Entrepreneur Login</h3>
              <p>Showcase your ideas, build your profile, and find co-founders or funding.</p>
              <Link to="/login" className="btn btn-primary">
                <i className="fas fa-sign-in-alt" /> Login as Entrepreneur
              </Link>
              <Link to="/register/entrepreneur" className="login-link">Don&apos;t have an account? Register</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content reveal">
            <h2>Ready to Transform your <span className="gradient-text">funding Journey</span>?</h2>
            <p>Join thousands of Startups and Investors already using Entangle to make smarter connections.</p>
            <div className="cta-buttons">
              <a href={`#${loginSectionId}`} className="btn btn-primary btn-lg" onClick={(e) => scrollToSection(e, loginSectionId)}>
                <i className="fas fa-rocket" /> Start Free Trial
              </a>
              <a href="#contact" className="btn btn-outline btn-lg" onClick={(e) => scrollToSection(e, 'contact')}>
                <i className="fas fa-calendar" /> Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="logo">
                <img src="/logo.png" alt="Entangle Logo" className="logo-img" />
                <span className="logo-text">Entangle</span>
              </Link>
              <p>AI-powered platform connecting startups with investors through intelligent matchmaking and verification.</p>
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github" /></a>
              </div>
            </div>
            <div className="footer-links">
              <h4>Platform</h4>
              <ul>
                <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Features</a></li>
                <li><a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')}>How It Works</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>Pricing</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>API</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Blog</a></li>
                <li><a href="#press">Press</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Legal</h4>
              <ul>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>Cookie Policy</a></li>
                <li><a href="#help-center">GDPR</a></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <ul>
                <li><i className="fas fa-envelope" /> contact@getentangle.ai</li>
                <li><i className="fas fa-phone" /> +94 70 300 2323</li>
                <li><i className="fas fa-map-marker-alt" /> Colombo, Sri Lanka</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Entangle. All rights reserved.</p>
            <p>Made with <i className="fas fa-heart" /> for Startups & Investors</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
