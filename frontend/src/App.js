import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io('http://localhost:5000');

function App() {
  const [name, setName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const [locks, setLocks] = useState({});

  useEffect(() => {
    socket.on('initial_data', (data) => setFormData(data));

    socket.on('field_update', ({ field, value }) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    });

    socket.on('field_locked', (field) => {
      setLocks((prev) => ({ ...prev, [field]: true }));
    });

    socket.on('field_unlocked', (field) => {
      setLocks((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    });

    return () => socket.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    socket.emit('field_change', { field: name, value });
  };

  const handleFocus = (e) => {
    socket.emit('lock_field', e.target.name);
  };

  const handleBlur = (e) => {
    socket.emit('unlock_field', e.target.name);
  };

  const isLocked = (field) => locks[field];

  return (
    <div className="App">
      <h1>Hello, {name || 'Stranger'} 👋</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <h2>📝 Collaborative Form</h2>
      <form>
        <input
          type="text"
          name="title"
          placeholder="Form Title"
          value={formData.title}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isLocked('title')}
        />
        {isLocked('title') && <span> 🔒 Locked</span>}
        <br /><br />

        <textarea
          name="description"
          placeholder="Form Description"
          value={formData.description}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isLocked('description')}
        />
        {isLocked('description') && <span> 🔒 Locked</span>}
        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={isLocked('category')}
        />
        {isLocked('category') && <span> 🔒 Locked</span>}
        <br />
      </form>
    </div>
  );
}

export default App;