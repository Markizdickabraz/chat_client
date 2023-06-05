import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css'

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io('https://billowy-halved-light.glitch.me/'); // URL вашого сервера Socket.IO

  useEffect(() => {
    // Підписка на подію 'message' для отримання повідомлень від сервера
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Закриття з'єднання при розмонтовці компонента
    return () => {
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const sendMessage = () => {
    // Відправка повідомлення на сервер
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div className="chat">
      <h1 className="chat-heading">Chat</h1>
      <div className="chat-container">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className="message">
              {msg}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
            placeholder="Type your message..."
          />
          <button onClick={sendMessage} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
