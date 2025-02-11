import type { NextApiRequest, NextApiResponse } from 'next';
import { School } from '../../../src/types/school';

// נדמה מסד נתונים פשוט לדוגמה
const mockSchools: School[] = [
  {
    id: '1',
    name: 'תיכון חדש דרכא בת-ים',
    domain: 'school1',
    logo: 'https://i.imgur.com/qk9quD3.png',
    address: 'אורט ישראל 7, בת ים',
    phone: '03-1234567',
    email: 'info@school1.edu'
  },
  {
    id: '2',
    name: 'אביגור',
    domain: 'school2',
    logo: 'https://i.imgur.com/tYzVVoM.png',
    address: 'תל חי 3, רמת גן',
    phone: '03-7654321',
    email: 'info@school2.edu'
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<School | { error: string }>
) {
  const { name } = req.query;
  
  // חיפוש בית הספר לפי הדומיין
  const school = mockSchools.find(s => s.domain === name);
  
  if (!school) {
    return res.status(404).json({ error: 'בית הספר לא נמצא' });
  }
  
  res.status(200).json(school);
}