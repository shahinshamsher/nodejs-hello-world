import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';

const socket = io('http://localhost:5000');

function App() {
  const [code, setCode] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('codeUpdate', newCode => setCode(newCode));
    socket.on('chatMessage', newMessage => setMessages([...messages, newMessage]));

    return () => {
      socket.off('codeUpdate');
      socket.off('chatMessage');
    };
  }, [messages]);

  const handleEditorChange = (value) => {
    setCode(value);
    socket.emit('codeUpdate', value);
  };

  const sendMessage = () => {
    socket.emit('chatMessage', message);
    setMessage('');
  };

  return (
    <div className="App">
      <Editor
        height="80vh"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
      />
      <div>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button onClick={sendMessage}>Send</button>
        <ul>
          {messages.map((msg, idx) => <li key={idx}>{msg}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
