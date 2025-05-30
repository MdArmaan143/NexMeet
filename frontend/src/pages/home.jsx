import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import styles from '../styles/home.module.css';
import animations from '../styles/animations.module.css';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    }

    return (
        <div className={`${styles.container} ${animations.pageEnter}`}>
            {/* Navigation Bar */}
            <nav className={`${styles.navbar} ${animations.fadeInUp}`}>
                <div className={styles.logoSection}>
                    <h1 className={styles.logo}>NexMeet</h1>
                </div>
                <div className={styles.navActions}>
                    <button 
                        onClick={() => navigate('/history')} 
                        className={styles.historyButton}
                        aria-label="View meeting history"
                    >
                        <svg 
                            className={styles.historyIcon} 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span>History</span>
                    </button>
                    <button 
                        onClick={() => {
                            // Clear all auth-related data
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            
                            // Clear any other session data if needed
                            sessionStorage.clear();
                            
                            // Redirect to landing page
                            navigate("/");
                        }} 
                        className={styles.logoutButton}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <div className={styles.contentWrapper}>
                    {/* Left Section */}
                    <div className={`${styles.leftSection} ${animations.slideInLeft}`}>
                        <div className={styles.heroContent}>
                            <h2 className={styles.heroTitle}>
                                Providing Quality Video Call Just Like Quality Education
                            </h2>
                            <p className={styles.heroSubtitle}>
                                Connect Instantly. Collaborate Globally.
                            </p>
                            
                            <div className={styles.joinSection}>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="text"
                                        value={meetingCode}
                                        onChange={(e) => setMeetingCode(e.target.value)}
                                        placeholder="Enter meeting code"
                                        className={styles.meetingInput}
                                    />
                                    <button 
                                        onClick={handleJoinVideoCall}
                                        className={styles.joinButton}
                                        disabled={!meetingCode.trim()}
                                    >
                                        Join Meeting
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className={`${styles.rightSection} ${animations.slideInRight}`}>
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
                                </defs>
                                
                                {/* Video Call Elements */}
                                <circle cx="200" cy="150" r="120" fill="url(#grad1)" />
                                <rect x="100" y="80" width="200" height="140" rx="20" fill="rgba(255, 255, 255, 0.1)" />
                                
                                {/* Connection Elements */}
                                <circle cx="320" cy="80" r="15" fill="#14B8A6" opacity="0.6" />
                                <circle cx="80" cy="220" r="10" fill="#4F46E5" opacity="0.4" />
                                
                                {/* Connection Lines */}
                                <path
                                    d="M200 150 L320 80"
                                    stroke="#14B8A6"
                                    strokeWidth="2"
                                    opacity="0.3"
                                />
                                <path
                                    d="M200 150 L80 220"
                                    stroke="#4F46E5"
                                    strokeWidth="2"
                                    opacity="0.3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default withAuth(HomeComponent)