import React, { useRef, useEffect } from 'react';
import { IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import styles from '../styles/videoMeet.module.css';

const ChatBox = ({ messages, message, onMessageChange, onSendMessage, onClose, username }) => {
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className={styles.chatSection}>
      <div className={styles.chatHeader}>
        <h2 className={styles.chatTitle}>Chat</h2>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </div>

      <div className={styles.chatMessages} ref={chatMessagesRef}>
        {messages.length > 0 ? (
          messages.map((item, index) => (
            <div
              key={index}
              className={`${styles.messageContainer} ${
                item.sender === username ? styles.sent : styles.received
              }`}
            >
              <div className={styles.messageHeader}>
                <span className={styles.messageSender}>{item.sender}</span>
                <span className={styles.messageTime}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={styles.messageBubble}>
                {item.data}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            No messages yet
          </p>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className={styles.chatInput}>
        <TextField
          fullWidth
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          variant="outlined"
          size="small"
          multiline
          maxRows={4}
        />
        <Button
          variant="contained"
          onClick={onSendMessage}
          className={styles.sendButton}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox; 