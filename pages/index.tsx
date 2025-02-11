import { useSchool } from '../src/hooks/useSchool';
import EmployeeEvaluation from '../src/components/EmployeeEvaluation';

export default function Home() {
  const school = useSchool();

  if (!school) {
    return <div className="p-8">טוען...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <EmployeeEvaluation />
      </main>
    </div>
  );
}