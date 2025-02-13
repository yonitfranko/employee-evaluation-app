// pages/admin-login.jsx
import { useRouter } from 'next/router';
import Login from '../src/components/Login';  // שינינו את הנתיב
export default function AdminLoginPage() {
  const router = useRouter();

  const handleLogin = (success) => {
    if (success) {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl mb-4">כניסת מנהל מערכת</h1>
        <Login onLogin={handleLogin} />
      </div>
    </div>
  );
}