import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ShowMessage() {
  const router = useRouter();
  const { code } = router.query;
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!code) return;
    fetch(`/api/message/${code}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else setMessage(data.message);
        setLoading(false);
      });
  }, [code]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-500 font-semibold">{error}</div>
        ) : (
          <>
            <div className="text-2xl font-bold mb-4 text-blue-700">Shared Message</div>
            <div className="text-lg text-gray-800 whitespace-pre-line break-words">{message}</div>
          </>
        )}
      </div>
    </div>
  );
}
