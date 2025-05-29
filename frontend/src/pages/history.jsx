import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/history.module.css';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const history = await getHistoryOfUser();
        setMeetings(history);
        setError(null);
      } catch (err) {
        setError('Failed to load meeting history');
        console.error('Error fetching history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleJoinMeeting = (meetingCode) => {
    navigate(`/${meetingCode}`);
  };

  return (
    <div className={styles.historyContainer}>
      {/* Header */}
      <header className={styles.header}>
        <button 
          onClick={() => navigate("/home")} 
          className={styles.homeButton}
          aria-label="Return to home"
        >
          <svg 
            className={styles.homeIcon} 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
          <span>Home</span>
        </button>
        <h1 className={styles.title}>Meeting History</h1>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {isLoading ? (
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading your meeting history...</p>
          </div>
        ) : error ? (
          <div className={styles.errorState}>
            <svg 
              className={styles.errorIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryButton}
            >
              Try Again
            </button>
          </div>
        ) : meetings.length === 0 ? (
          <div className={styles.emptyState}>
            <svg 
              className={styles.emptyIcon} 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <h2>No Previous Meetings</h2>
            <p>Your meeting history will appear here</p>
            <button 
              onClick={() => navigate("/home")} 
              className={styles.createButton}
            >
              Start a New Meeting
            </button>
          </div>
        ) : (
          <div className={styles.meetingsGrid}>
            {meetings.map((meeting, index) => (
              <div key={meeting.meetingCode || index} className={styles.meetingCard}>
                <div className={styles.cardContent}>
                  <div className={styles.meetingInfo}>
                    <h3 className={styles.meetingCode}>
                      Meeting Code: {meeting.meetingCode}
                    </h3>
                    <p className={styles.meetingDate}>
                      {formatDate(meeting.date)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleJoinMeeting(meeting.meetingCode)}
                    className={styles.joinButton}
                  >
                    Join Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
