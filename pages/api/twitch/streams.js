export const config = { runtime: 'nodejs' };

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
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

  const { game, language, min_viewers } = req.query;

  try {
    if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
      return res.status(500).json({ message: 'Missing Twitch credentials' });
    }

    // Get OAuth token
    const authResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    });
    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    const params = new URLSearchParams();
    if (language) params.set('language', language);
    // Note: Twitch helix/streams supports game_id, not game name; resolving name -> id requires extra request.
    // For convenience, support simple 'game' name by resolving first when provided.
    if (game) {
      const gameResp = await fetch(`https://api.twitch.tv/helix/games?name=${encodeURIComponent(game)}` ,{
        headers: {
          'Client-Id': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${accessToken}`
        }
      });
      const gameData = await gameResp.json();
      const gameId = gameData.data && gameData.data[0] && gameData.data[0].id;
      if (gameId) params.set('game_id', gameId);
    }

    const streamsResp = await fetch(`https://api.twitch.tv/helix/streams?${params.toString()}`, {
      headers: {
        'Client-Id': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const streamsData = await streamsResp.json();

    let streams = Array.isArray(streamsData.data) ? streamsData.data : [];
    const minViewersNum = min_viewers ? parseInt(min_viewers, 10) : undefined;
    if (!Number.isNaN(minViewersNum) && typeof minViewersNum === 'number') {
      streams = streams.filter((s) => (s.viewer_count || 0) >= minViewersNum);
    }

    res.status(200).json({ streams });
  } catch (err) {
    console.error('Twitch streams proxy error:', err);
    res.status(500).json({ message: 'Error fetching streams' });
  }
}




