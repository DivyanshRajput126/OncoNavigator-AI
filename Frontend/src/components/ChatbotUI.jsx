import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';
import { sendChatMessage } from '../services/api';
import './ChatbotUI.css';

const ChatbotUI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am your OncoNavigator AI assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Generate a simple session ID when the component mounts
    setSessionId(`session-${Date.now()}-${Math.floor(Math.random() * 1000)}`);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const currentInput = input;
    // Add user message immediately
    setMessages(prev => [...prev, { text: currentInput, isUser: true }]);
    setInput('');
    setIsTyping(true);

    try {
      const data = await sendChatMessage(sessionId, currentInput);
      setMessages(prev => [...prev, { 
        text: data.response, 
        isUser: false 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error communicating with the server.", 
        isUser: false,
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Button */}
      <div className={`chatbot-tooltip-container ${isOpen ? 'hidden' : ''}`}>
        <span className="chatbot-tooltip">Medical Chatbot</span>
        <button 
          className="chatbot-toggle btn btn-primary" 
          onClick={toggleChat}
        >
          <Bot size={32} />
        </button>
      </div>

      {/* Chat Window */}
      <div className={`chatbot-window glass ${isOpen ? 'open' : ''}`}>
        <div className="chat-header">
          <div className="chat-title">
            <Bot size={20} className="text-gradient" />
            <h3>AI Assistant</h3>
          </div>
          <button className="close-btn" onClick={toggleChat}>
            <X size={20} />
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message-container ${msg.isUser ? 'user' : 'bot'}`}>
              {!msg.isUser && (
                <div className="bot-avatar">
                  <Bot size={16} />
                </div>
              )}
              <div className={`message bubble ${msg.isUser ? 'user-bubble' : 'bot-bubble'} ${msg.isError ? 'error-bubble' : ''}`}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message-container bot">
              <div className="bot-avatar">
                <Bot size={16} />
              </div>
              <div className="message bubble bot-bubble typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type your medical query..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input glass"
            disabled={isTyping}
          />
          <button type="submit" className="send-btn btn-primary" disabled={isTyping || !input.trim()}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotUI;
