import { schools } from '../../../src/data/schools';

export default function handler(req, res) {
  const { name } = req.query;
  
  const school = schools.find(s => s.domain === name);
  
  if (!school) {
    return res.status(404).json({ error: 'בית הספר לא נמצא' });
  }
  
  res.status(200).json(school);
}