import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [shortLink, setShortLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const maxLength = 200;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortLink('');
    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }
    if (message.length > maxLength) {
      setError(`Message cannot exceed ${maxLength} characters.`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await res.json();
      if (res.ok && data.code) {
        setShortLink(`${window.location.origin}/${data.code}`);
        setMessage('');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Share a Short Message</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px] resize-none"
            placeholder={`Write your message (max ${maxLength} chars)...`}
            maxLength={maxLength}
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{message.length}/{maxLength}</span>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              disabled={loading}
            >
              {loading ? 'Sharing...' : 'Submit & Share Short Link'}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </form>
        {shortLink && (
          <div className="mt-6 text-center">
            <div className="text-green-600 font-semibold mb-2">Your short link:</div>
            <a
              href={shortLink}
              className="text-blue-700 underline break-all text-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
