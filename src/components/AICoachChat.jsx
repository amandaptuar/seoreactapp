import React, { useState, useEffect, useRef } from 'react';
import { fetchCoachSuggestions, fetchCoachChat } from '../lib/apiUtils';

const AICoachChat = ({ analysis, isModal = false, onClose = null }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am your Limitless AI Coach. I have analyzed your cognitive assessment. How can I help you improve your cognitive performance today?'
    }
  ]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(null);

  const messagesEndRef = useRef(null);

  // Get the actual analysis payload (fallback to sessionStorage if prop is missing)
  const getAnalysis = () => {
    if (analysis) return analysis;
    const saved = sessionStorage.getItem('analysisReport');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved analysis report:', e);
      }
    }
    return null;
  };

  const currentAnalysis = getAnalysis();

  // Load initial suggestions
  useEffect(() => {
    const loadInitialSuggestions = async () => {
      if (!currentAnalysis) return;
      try {
        setError(null);
        const data = await fetchCoachSuggestions(currentAnalysis);
        if (data?.suggestedFollowUps) {
          setSuggestions(data.suggestedFollowUps);
        }
      } catch (err) {
        console.error('Error fetching initial suggestions:', err);
        // Fallback to default questions if API fails or is cold-starting
        setSuggestions([
          'How can I improve my focus score?',
          'What does my cognitive age estimate mean?',
          'How does stress impact my cognitive performance?',
          'What action steps should I take next?'
        ]);
      }
    };

    loadInitialSuggestions();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading || !currentAnalysis) return;

    setError(null);
    const userMsg = { role: 'user', content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const data = await fetchCoachChat(currentAnalysis, updatedMessages);
      
      if (data?.message) {
        setMessages(prev => [...prev, data.message]);
      } else {
        throw new Error('No message returned from AI coach');
      }

      if (data?.suggestedFollowUps) {
        setSuggestions(data.suggestedFollowUps);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error('Error communicating with AI coach:', err);
      setError('Failed to get a response. Please try again.');
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I am having trouble connecting to the model server. Let me try again if you resend your message.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(input);
    }
  };

  if (!currentAnalysis) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', background: '#fff', borderRadius: '16px', border: '1px solid #e7e9f2' }}>
        <p style={{ color: '#64748B', fontSize: '15px', fontWeight: '500' }}>
          Please complete your assessment first to receive personalized AI Coach suggestions.
        </p>
      </div>
    );
  }

  const userName = sessionStorage.getItem('name') || 'User';
  const avatarChar = userName.charAt(0).toUpperCase();

  return (
    <div className={`ai-coach-container ${isModal ? 'modal-chat' : 'inline-chat'}`}>
      <style>{`
        .ai-coach-container {
          background: #ffffff;
          border: 1px solid #e7e9f2;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(30, 30, 60, 0.05);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          width: 100%;
        }
        .ai-coach-container.inline-chat {
          min-height: 480px;
          max-height: 600px;
        }
        .ai-coach-container.modal-chat {
          height: 100%;
          border: none;
          box-shadow: none;
          border-radius: 0;
        }
        .coach-header {
          align-items: center;
          background: linear-gradient(135deg, #151e2d 0%, #0c1222 100%);
          color: #ffffff;
          display: flex;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .coach-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .coach-avatar-circle {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          height: 40px;
          width: 40px;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.3);
        }
        .coach-header-title h3 {
          font-size: 16px;
          font-weight: 700;
          margin: 0;
        }
        .coach-header-title p {
          color: #9ca3af;
          font-size: 11.5px;
          margin: 2px 0 0;
          font-weight: 500;
        }
        .coach-close-btn {
          background: transparent;
          border: none;
          color: #fff;
          cursor: pointer;
          font-size: 20px;
          padding: 4px;
          transition: opacity 0.2s;
        }
        .coach-close-btn:hover {
          opacity: 0.7;
        }
        .coach-messages-area {
          background: #f8fafc;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 16px;
          overflow-y: auto;
          padding: 20px;
          min-height: 250px;
        }
        .message-bubble-wrapper {
          display: flex;
          gap: 10px;
          max-width: 80%;
        }
        .message-bubble-wrapper.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }
        .message-bubble-wrapper.assistant {
          align-self: flex-start;
        }
        .user-avatar-circle {
          background: #efe9fd;
          color: #6c5ce7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          height: 32px;
          width: 32px;
          flex-shrink: 0;
          border: 1.5px solid rgba(108, 92, 231, 0.25);
        }
        .message-content {
          border-radius: 12px;
          font-size: 14.5px;
          line-height: 1.5;
          padding: 10px 14px;
          white-space: pre-wrap;
        }
        .message-bubble-wrapper.user .message-content {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          color: #ffffff;
          border-top-right-radius: 2px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }
        .message-bubble-wrapper.assistant .message-content {
          background: #ffffff;
          color: #1f2430;
          border-top-left-radius: 2px;
          border: 1px solid #e7e9f2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
        }
        .typing-dots {
          display: flex;
          gap: 4px;
          align-items: center;
          height: 20px;
        }
        .typing-dot {
          background: #94a3b8;
          border-radius: 50%;
          height: 6px;
          width: 6px;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
        
        .coach-suggestions-area {
          background: #f8fafc;
          border-top: 1px solid #e7e9f2;
          padding: 12px 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .coach-suggestions-title {
          font-size: 11.5px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .suggestions-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .suggestion-pill {
          background: #ffffff;
          border: 1px solid #dcdfe8;
          border-radius: 20px;
          color: #4f46e5;
          cursor: pointer;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          transition: all 0.2s ease;
          text-align: left;
        }
        .suggestion-pill:hover {
          background: #f1f0ff;
          border-color: #6366f1;
          transform: translateY(-1px);
        }
        .coach-input-area {
          background: #ffffff;
          border-top: 1px solid #e7e9f2;
          display: flex;
          gap: 10px;
          padding: 14px 20px;
          align-items: center;
        }
        .coach-input {
          border: 1px solid #dcdfe8;
          border-radius: 24px;
          color: #1f2430;
          flex: 1;
          font-size: 14px;
          outline: none;
          padding: 10px 16px;
          transition: border-color 0.2s;
        }
        .coach-input:focus {
          border-color: #6366f1;
        }
        .coach-send-btn {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          border: none;
          border-radius: 50%;
          color: #ffffff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 38px;
          width: 38px;
          transition: all 0.2s;
          box-shadow: 0 4px 10px rgba(99, 102, 241, 0.25);
        }
        .coach-send-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
        }
        .coach-send-btn:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style>

      {/* Header */}
      <div className="coach-header">
        <div className="coach-header-info">
          <div className="coach-avatar-circle">🤖</div>
          <div className="coach-header-title">
            <h3>Limitless AI Coach</h3>
            <p>Interactive Cognitive Assistant</p>
          </div>
        </div>
        {isModal && onClose && (
          <button className="coach-close-btn" onClick={onClose} aria-label="Close Chat">✕</button>
        )}
      </div>

      {/* Messages */}
      <div className="coach-messages-area">
        {messages.map((msg, index) => (
          <div key={index} className={`message-bubble-wrapper ${msg.role}`}>
            {msg.role === 'assistant' ? (
              <div className="user-avatar-circle" style={{ background: '#eef2ff', color: '#6366f1', borderColor: 'rgba(99, 102, 241, 0.2)' }}>🤖</div>
            ) : (
              <div className="user-avatar-circle">{avatarChar}</div>
            )}
            <div className="message-content">{msg.content}</div>
          </div>
        ))}

        {loading && (
          <div className="message-bubble-wrapper assistant">
            <div className="user-avatar-circle" style={{ background: '#eef2ff', color: '#6366f1', borderColor: 'rgba(99, 102, 241, 0.2)' }}>🤖</div>
            <div className="message-content">
              <div className="typing-dots">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && !loading && (
        <div className="coach-suggestions-area">
          <div className="coach-suggestions-title">Follow-up Questions</div>
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="suggestion-pill"
                onClick={() => handleSendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="coach-input-area">
        <input
          type="text"
          className="coach-input"
          placeholder="Ask a question about your cognitive report..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button
          className="coach-send-btn"
          onClick={() => handleSendMessage(input)}
          disabled={loading || !input.trim()}
          aria-label="Send Message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AICoachChat;
