import { useEffect, useState } from 'react';
import { School } from '../types/school';

export function useSchool() {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // בינתיים נשתמש בשם קבוע לבדיקה
    const schoolName = 'school1';
    
    fetch(`/api/schools/${schoolName}`)
      .then(res => res.json())
      .then(data => {
        setSchool(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching school data:', error);
        setLoading(false);
      });
  }, []);

  return school;
}

