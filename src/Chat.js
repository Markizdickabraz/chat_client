/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

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
  }, []);

  const sendMessage = () => {
    // Відправка повідомлення на сервер
    socket.emit('message', message);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
