import React from 'react';
import Chat from './components/chat';
import Login from '../pages/Login';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div className="App">
      {token ? <Chat /> : <Login />}
    </div>
  );
}

export default App;
