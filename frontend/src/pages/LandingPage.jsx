import React, { useEffect } from 'react'
import "../App.css"
import { Link } from 'react-router-dom'
import styles from '../styles/landingPage.module.css'
import Navigation from '../components/Navigation'
import ThemeToggle from '../components/ThemeToggle'

export default function LandingPage() {
  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link')
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;600&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  return (
    <div className={styles.landingPageContainer}>
      <Navigation />
      
      <div className={styles.landingMainContainer}>
        <div className={styles.textContent}>
          <h1>
            <span className={styles.highlight}>Connect</span> with your loved Ones
          </h1>
          <p>Cover a distance by NexMeet</p>
          <div role='button'>
            <Link to={"/auth"} className={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </div>
        
        <div className={styles.illustrationContainer}>
          <svg
            className={styles.illustration}
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Video Call Illustration */}
            <rect x="50" y="50" width="300" height="200" rx="20" fill="var(--primary-color)" opacity="0.1"/>
            <circle cx="200" cy="150" r="60" fill="var(--primary-color)" opacity="0.2"/>
            <path
              d="M180 150L220 130V170L180 150Z"
              fill="var(--primary-color)"
            />
            <circle cx="320" cy="80" r="20" fill="var(--accent-color)" opacity="0.8"/>
            <circle cx="80" cy="220" r="15" fill="var(--accent-color)" opacity="0.6"/>
          </svg>
        </div>
      </div>

      <ThemeToggle />
    </div>
  )
}
