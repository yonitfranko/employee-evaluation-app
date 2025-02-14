import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // בדיקת סטטוס מנהל
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);

    // טעינת בתי הספר
    fetch('/api/schools')
      .then(res => res.json())
      .then(data => {
        setSchools(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching schools:', error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
  };

  const filteredSchools = schools.filter(school => 
    school.name.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-xl">טוען...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto py-12 px-4">
        {/* כפתורי התחברות/התנתקות */}
        <div className="flex justify-end mb-4">
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              התנתק
            </button>
          ) : (
            <Link 
              href="/admin-login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              כניסת מנהל
            </Link>
          )}
        </div>

        <h1 className="text-3xl font-bold text-center mb-8">
          מערכת הערכת עובדים - בחירת בית ספר
        </h1>
        
        <div className="mb-8">
          <input
            type="text"
            placeholder="חיפוש בית ספר..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <Link 
              href={`/school/${school.domain}`}
              key={school.id}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <img
                    src={school.logo}
                    alt={school.name}
                    className="w-16 h-16 object-contain"
                  />
                  <h2 className="text-xl font-semibold">{school.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}