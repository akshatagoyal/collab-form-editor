import React from 'react';

function Greeting({ name }) {
  return (
    <h1>Hello, {name ? name : "Stranger"} 👋</h1>
  );
}

export default Greeting;
