import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/authentication.module.css';

export default function Authentication() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState(0);
  const [open, setOpen] = useState(false);

  const { handleRegister, handleLogin } = useContext(AuthContext);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (formState === 0) {
        await handleLogin(username, password);
        setMessage("Login successful!");
        setOpen(true);
      } else {
        const result = await handleRegister(name, username, password);
        if (result) {
          setMessage("Registration successful!");
          setOpen(true);
          setUsername("");
          setPassword("");
          setName("");
          setFormState(0);
        }
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Something went wrong";
      setError(msg);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authContent}>
        {/* Left Section - Illustration */}
        <div className={styles.illustrationSection}>
          <div className={styles.illustrationWrapper}>
            <svg
              className={styles.illustration}
              viewBox="0 0 400 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background Elements */}
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 0.2 }} />
                  <stop offset="100%" style={{ stopColor: '#14B8A6', stopOpacity: 0.2 }} />
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                  <feOffset dx="2" dy="2" result="offsetblur" />
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Video Call Elements */}
              <circle cx="200" cy="150" r="120" fill="url(#grad1)" />
              <rect x="100" y="80" width="200" height="140" rx="20" fill="rgba(255, 255, 255, 0.1)" />
              
              {/* People Elements */}
              <circle cx="150" cy="120" r="15" fill="#4F46E5" filter="url(#shadow)" />
              <circle cx="250" cy="120" r="15" fill="#14B8A6" filter="url(#shadow)" />
              <circle cx="200" cy="180" r="15" fill="#8B5CF6" filter="url(#shadow)" />
              
              {/* Connection Lines */}
              <path
                d="M150 120 L200 180"
                stroke="#4F46E5"
                strokeWidth="2"
                opacity="0.3"
              />
              <path
                d="M250 120 L200 180"
                stroke="#14B8A6"
                strokeWidth="2"
                opacity="0.3"
              />
              <path
                d="M150 120 L250 120"
                stroke="#8B5CF6"
                strokeWidth="2"
                opacity="0.3"
              />
              
              {/* Decorative Elements */}
              <circle cx="320" cy="80" r="10" fill="#4F46E5" opacity="0.4" />
              <circle cx="80" cy="220" r="8" fill="#14B8A6" opacity="0.4" />
              <circle cx="350" cy="200" r="6" fill="#8B5CF6" opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className={styles.formSection}>
          <div className={styles.formContainer}>
            <h2 className={styles.title}>
              {formState === 0 ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className={styles.subtitle}>
              {formState === 0 ? 'Sign in to continue' : 'Join NexMeet today'}
            </p>

            <div className={styles.formTabs}>
              <button
                type="button"
                className={`${styles.tabButton} ${formState === 0 ? styles.active : ''}`}
                onClick={() => {
                  setFormState(0);
                  setError('');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`${styles.tabButton} ${formState === 1 ? styles.active : ''}`}
                onClick={() => {
                  setFormState(1);
                  setError('');
                }}
              >
                Sign Up
              </button>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <form className={styles.form} onSubmit={handleAuth}>
              {formState === 1 && (
                <div className={styles.inputGroup}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                {formState === 0 ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {open && (
        <div className={styles.notification}>
          <p>{message}</p>
          <button 
            type="button"
            onClick={handleClose} 
            className={styles.closeButton}
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
