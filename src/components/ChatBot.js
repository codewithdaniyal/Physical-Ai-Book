import React, { useState } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Hello! I am your AI Teaching Assistant. Ask me anything about the book!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Toggle chat window
  const toggleChat = () => setIsOpen(!isOpen);

  // Send message to Backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    const question = input;
    setInput('');

    try {
      // 2. Call your Python Backend
      const response = await fetch('http://127.0.0.1:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question, selected_text: "" }),
      });

      const data = await response.json();

      // 3. Add AI Response
      const aiMessage = { role: 'system', content: data.answer };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'system', content: 'Error: Is your backend running? (Port 8000)' }]);
    }
    setLoading(false);
  };

  // Styles (CSS-in-JS for simplicity)
  const styles = {
    widget: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      fontFamily: 'Arial, sans-serif',
    },
    button: {
      backgroundColor: '#25c2a0',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      cursor: 'pointer',
      fontSize: '30px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    window: {
      position: 'absolute',
      bottom: '80px',
      right: '0',
      width: '350px',
      height: '500px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '1px solid #ddd',
    },
    header: {
      backgroundColor: '#25c2a0',
      color: 'white',
      padding: '15px',
      fontWeight: 'bold',
    },
    body: {
      flex: 1,
      padding: '10px',
      overflowY: 'auto',
      backgroundColor: '#f9f9f9',
    },
    footer: {
      padding: '10px',
      borderTop: '1px solid #ddd',
      display: 'flex',
      backgroundColor: 'white',
    },
    input: {
      flex: 1,
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '20px',
      marginRight: '10px',
    },
    sendBtn: {
      backgroundColor: '#333',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      padding: '5px 15px',
      cursor: 'pointer',
    },
    msgBubble: (role) => ({
      backgroundColor: role === 'user' ? '#333' : '#e0e0e0',
      color: role === 'user' ? 'white' : 'black',
      padding: '10px',
      borderRadius: '10px',
      marginBottom: '10px',
      maxWidth: '80%',
      alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
      fontSize: '14px',
    }),
  };

  return (
    <div style={styles.widget}>
      {isOpen && (
        <div style={styles.window}>
          <div style={styles.header}>
            Physical AI Assistant
            <span onClick={toggleChat} style={{float:'right', cursor:'pointer'}}>✖</span>
          </div>
          <div style={styles.body}>
            {messages.map((msg, index) => (
              <div key={index} style={{display:'flex', flexDirection:'column'}}>
                 <div style={styles.msgBubble(msg.role)}>{msg.content}</div>
              </div>
            ))}
            {loading && <div style={{color:'#999', fontSize:'12px'}}>AI is typing...</div>}
          </div>
          <div style={styles.footer}>
            <input 
              style={styles.input} 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about the book..." 
            />
            <button style={styles.sendBtn} onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button style={styles.button} onClick={toggleChat}>💬</button>
    </div>
  );
}