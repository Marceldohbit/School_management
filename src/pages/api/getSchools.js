import { getDBConnection } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const db = await getDBConnection();
  const [rows] = await db.execute('SELECT id, name, address, city, image FROM schools ORDER BY id DESC');
  await db.end();
  res.status(200).json(rows);
}
