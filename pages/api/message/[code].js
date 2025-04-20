import { dbConnect } from '../../../lib/mongodb';
import Message from '../../../models/Message';

export default async function handler(req, res) {
  const { code } = req.query;
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  await dbConnect();
  const doc = await Message.findOne({ code });
  if (!doc) {
    return res.status(404).json({ error: 'Message not found.' });
  }
  res.status(200).json({ message: doc.message });
}
