import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Predictions() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('/api/breakout-candidates');
      const data = await response.json();
      
      setCandidates(data.candidates || []);
      setStatus(data.status);
      setMessage(data.message);
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setMessage('Failed to load predictions');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>AI Predictions | NXTUP</title>
        <meta name="description" content="AI-powered breakout streamer predictions" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <Link href="/">
              <h1 className="text-4xl font-bold text-white cursor-pointer">
                NXT<span className="text-purple-400">UP</span>
              </h1>
            </Link>
            <Link href="/">
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                ← Back to Home
              </button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              🔥 Breakout Predictions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              AI-powered predictions of streamers about to explode
            </p>
          </div>

          {loading && (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              <p className="text-white mt-4">Loading predictions...</p>
            </div>
          )}

          {!loading && status === 'pending' && (
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-4">
                AI is Analyzing...
              </h3>
              <p className="text-gray-300 mb-6">
                {message}
              </p>
              <p className="text-sm text-gray-400">
                Our AI is collecting data from live Twitch streams. 
                First predictions will be available once we have 3+ days of data.
              </p>
            </div>
          )}

          {!loading && candidates.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {candidates.map((candidate, index) => (
                  <div
                    key={candidate.user_id || index}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        #{index + 1}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                          {Math.round(candidate.breakout_score || 0)}%
                        </div>
                        <div className="text-xs text-gray-400">
                          Breakout Score
                        </div>
                      </div>
                    </div>

                    <a
                      href={`https://twitch.tv/${candidate.user_login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-400 transition-colors">
                        {candidate.user_login}
                      </h3>
                    </a>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Viewers:</span>
                        <span className="text-white font-semibold">
                          {parseInt(candidate.current_viewers || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">30d Avg:</span>
                        <span className="text-white font-semibold">
                          {parseInt(candidate.avg_viewers_30d || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Growth Rate:</span>
                        <span className={`font-semibold ${
                          parseFloat(candidate.viewer_growth_30d) > 0 
                            ? 'text-green-400' 
                            : 'text-red-400'
                        }`}>
                          {parseFloat(candidate.viewer_growth_30d || 0).toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Followers:</span>
                        <span className="text-white font-semibold">
                          {parseInt(candidate.current_followers || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <a
                      href={`https://twitch.tv/${candidate.user_login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-4 w-full py-2 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg transition-colors font-semibold"
                    >
                      Watch on Twitch →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}