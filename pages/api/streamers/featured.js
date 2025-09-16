export const config = { runtime: 'nodejs' };

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Static mock featured streamers; replace with your real data source later
  const streamers = [
    {
      id: 1,
      name: 'PixelNinja',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
      bio: 'Master of indie games and speedruns',
      bioSecond: 'Known for incredible reaction times',
      rating: 87,
      followers: '45.2K',
      avgViewers: '2.1K',
      growth: '+340%'
    },
    {
      id: 2,
      name: 'CosmicGamer',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      bio: 'Space games and simulation expert',
      bioSecond: 'Building the ultimate gaming setup',
      rating: 92,
      followers: '67.8K',
      avgViewers: '3.4K',
      growth: '+280%'
    },
    {
      id: 3,
      name: 'NeonQueen',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616c6d12e04?w=400&h=400&fit=crop&crop=face',
      bio: 'Competitive FPS with killer style',
      bioSecond: 'Rising esports phenomenon',
      rating: 95,
      followers: '89.1K',
      avgViewers: '4.7K',
      growth: '+425%'
    }
  ];

  res.status(200).json({ streamers });
}


