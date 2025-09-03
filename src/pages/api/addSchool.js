import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { getDBConnection } from '../../lib/db';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).json({ error: 'Form parse error' });

    // unwrap fields safely
    const unwrap = (val) => (Array.isArray(val) ? val[0] : val);
    const name = unwrap(fields.name);
    const address = unwrap(fields.address);
    const city = unwrap(fields.city);
    const state = unwrap(fields.state);
    const contact = unwrap(fields.contact);
    const email_id = unwrap(fields.email_id);

    // Validation
    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email_id)) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Handle file
    const fileArray = Array.isArray(files.image) ? files.image : [files.image];
    const img = fileArray[0];
    if (!img) return res.status(400).json({ error: 'Image is required' });

    try {
      // Ensure folder exists
      const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
      fs.mkdirSync(uploadDir, { recursive: true });

      // Handle filename
      const originalName = img.originalFilename || img.newFilename || 'upload';
      const ext = path.extname(originalName);
      const newFileName = `${Date.now()}_${originalName}`;
      const destPath = path.join(uploadDir, newFileName);

      const srcPath = img.filepath || img.file || img.path;
      if (!srcPath) throw new Error('No filepath found on uploaded image');

      fs.renameSync(srcPath, destPath);
      const imagePath = `/schoolImages/${newFileName}`;

      // Save to DB
      const db = await getDBConnection();
      await db.execute(
        'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, address, city, state, contact, imagePath, email_id]
      );
      await db.end();

      res.status(200).json({ success: true });
    } catch (e) {
      console.error("Upload error:", e);
      return res.status(500).json({ error: 'Image upload failed', details: e.message });
    }
  });
}
