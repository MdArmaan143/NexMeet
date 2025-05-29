import React, { useState, useEffect } from 'react';
import styles from '../styles/themeToggle.module.css';

const ThemeToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);

  const themes = [
    { id: 'dark', icon: '🌙', label: 'Dark Mode' },
    { id: 'light', icon: '☀️', label: 'Light Mode' },
    { id: 'professional', icon: '🎨', label: 'Professional Theme' }
  ];

  return (
    <div className={styles.themeToggle}>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme menu"
      >
        {themes.find(t => t.id === currentTheme)?.icon || '🎨'}
      </button>
      
      {isOpen && (
        <div className={styles.themeMenu}>
          {themes.map(theme => (
            <button
              key={theme.id}
              className={`${styles.themeOption} ${currentTheme === theme.id ? styles.active : ''}`}
              onClick={() => {
                setCurrentTheme(theme.id);
                setIsOpen(false);
              }}
            >
              <span className={styles.themeIcon}>{theme.icon}</span>
              <span className={styles.themeLabel}>{theme.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle; 