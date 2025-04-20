import { dbConnect } from '../../lib/mongodb';
import Message from '../../models/Message';

function generateCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty.' });
  }
  if (message.length > 200) {
    return res.status(400).json({ error: 'Message too long.' });
  }
  await dbConnect();
  let code;
  let exists = true;
  // Ensure unique code
  while (exists) {
    code = generateCode(8);
    exists = await Message.findOne({ code });
  }
  const doc = await Message.create({ code, message });
  res.status(200).json({ code });
}
