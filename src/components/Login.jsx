import { useState } from 'react';
import { ADMIN_USERS } from '../data/admins';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (ADMIN_USERS.includes(username)) {
      localStorage.setItem('isAdmin', 'true');
      onLogin(true);
    } else {
      setError('אין לך הרשאת מנהל מערכת');
    }
  };

  return (
    <div className="p-4">
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2"
        placeholder="הכנס שם משתמש"
      />
      <button 
        onClick={handleLogin}
        className="mx-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        התחבר
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Login;