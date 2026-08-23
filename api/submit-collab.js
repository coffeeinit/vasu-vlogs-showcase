import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  // CORS Headers for allowing requests if needed
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { collab_type, name, brand, mobile, message } = req.body;

    // Validate required fields
    if (!name || !mobile) {
      return res.status(400).json({ error: 'Name and mobile are required.' });
    }

    // Insert into Vercel Postgres Database
    await sql`
      INSERT INTO submissions (collab_type, name, brand, mobile, message)
      VALUES (${collab_type || 'unspecified'}, ${name}, ${brand || ''}, ${mobile}, ${message || ''});
    `;

    return res.status(200).json({ success: true, message: 'Submission successful' });
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
