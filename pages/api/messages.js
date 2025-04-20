let messages = [];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ messages });
  } else if (req.method === 'POST') {
    const { message } = req.body;
    if (!message || typeof message !== 'string' || message.length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }
    if (message.length > 200) {
      return res.status(400).json({ error: 'Message too long.' });
    }
    messages = [message, ...messages].slice(0, 50); // Keep only the latest 50 messages
    res.status(200).json({ messages });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
