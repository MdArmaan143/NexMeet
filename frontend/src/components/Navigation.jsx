import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/navigation.module.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Join as Guest', path: '/aljk23' },
    { label: 'Register', path: '/auth' },
    { label: 'Login', path: '/auth' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navHeader}>
        <h2>NexMeet</h2>
      </div>

      {/* Hamburger Menu Button */}
      <button 
        className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation Menu */}
      <div className={`${styles.navList} ${isMenuOpen ? styles.active : ''}`}>
        {navItems.map((item, index) => (
          <p 
            key={index}
            onClick={() => handleNavigation(item.path)}
            className={styles.navItem}
          >
            {item.label}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 