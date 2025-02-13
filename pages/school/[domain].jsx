import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmployeeEvaluation from '@/components/EmployeeEvaluation';

export default function SchoolPage() {
  const router = useRouter();
  const { domain } = router.query;
  const [school, setSchool] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  useEffect(() => {
    if (domain) {
      fetch(`/api/schools/${domain}`)
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            router.push('/');
          } else {
            setSchool(data);
          }
        })
        .catch(() => router.push('/'));
    }
  }, [domain, router]);

  if (!school) {
    return <div className="p-8" dir="rtl">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img 
                src={school.logo} 
                alt={school.name} 
                className="h-12 w-auto"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                {school.name}
              </h1>
            </div>
            {isAdmin && (
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                חזרה לרשימת בתי הספר
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <EmployeeEvaluation schoolDomain={domain} />
      </main>
    </div>
  );
}