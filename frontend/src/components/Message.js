import React from 'react';

function Message({ name }) {
  if (!name) return null;

  return (
    <p>Welcome to the React app, {name}!</p>
  );
}

export default Message;
