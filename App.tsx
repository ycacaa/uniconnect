import React, { useState } from 'react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // In a real app, this would check localStorage or a session token
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="antialiased text-slate-900 bg-white">
      {isAuthenticated ? (
        <Dashboard />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;