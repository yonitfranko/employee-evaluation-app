import { schools } from '../../../src/data/schools';

export default function handler(req, res) {
  res.status(200).json(schools);
}