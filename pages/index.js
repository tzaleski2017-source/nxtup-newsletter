import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Error subscribing. Please try again.');
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>NXTUP - Discover Tomorrow's Top Streamers Today</title>
        <meta name="description" content="AI-powered insights for agents and managers to discover the next generation of streaming talent" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-white mb-6">
              NXT<span className="text-purple-400">UP</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              AI-powered insights for talent agents and managers to discover the next generation of streaming superstars
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Stop Missing the Next Big Streamer
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Early Discovery</h3>
                  <p className="text-gray-300">Identify rising talent before they explode</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Analysis</h3>
                  <p className="text-gray-300">Data-driven insights from Twitch streams</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-indigo-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📈</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Growth Metrics</h3>
                  <p className="text-gray-300">Track engagement, audience, and potential</p>
                </div>
              </div>

              {/* Newsletter Signup */}
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@agency.com"
                      required
                      className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:border-purple-400"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isLoading ? 'Joining...' : 'Get Early Access'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 text-center">
                    Weekly insights delivered to talent professionals
                  </p>
                </form>
              ) : (
                <div className="text-center">
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 max-w-md mx-auto">
                    <p className="text-green-400 font-semibold">🎉 You're on the list!</p>
                    <p className="text-gray-300 text-sm mt-1">
                      You'll receive our first AI-powered streamer insights soon.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sample Insights Preview */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                What You'll Get
              </h3>
              
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-semibold">StreamerName123</h4>
                      <p className="text-gray-300 text-sm">Gaming • 15.2K followers</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        🔥 Rising Fast
                      </div>
                      <p className="text-gray-300 text-sm mt-1">+127% growth</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    AI Insight: High engagement rate (8.3%), consistent streaming schedule, 
                    strong community interaction. Predicted to reach 50K+ followers within 3 months.
                  </p>
                </div>
                
                <p className="text-center text-gray-400 text-sm">
                  Sample analysis - Real insights coming soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}