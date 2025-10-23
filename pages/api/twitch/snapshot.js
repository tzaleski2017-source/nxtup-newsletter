import { prisma } from '../_db';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { broadcaster_id } = req.body || {};
  if (!broadcaster_id) return res.status(400).json({ message: 'Missing broadcaster_id' });

  try {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const streamer = await prisma.streamer.findUnique({ where: { id: String(broadcaster_id) }, include: { oauth: true } });
    if (!streamer || !streamer.oauth) return res.status(404).json({ message: 'Streamer not authorized' });

    // Get followers (requires moderator:read:followers) – needs moderator_id context; simplified example
    // For demo, we’ll store viewer_count via helix/streams and leave followers/subscribers null unless implemented per channel context

    const streamsResp = await fetch(`https://api.twitch.tv/helix/streams?user_id=${encodeURIComponent(streamer.id)}`, {
      headers: {
        'Client-Id': clientId,
        'Authorization': `Bearer ${streamer.oauth.accessToken}`
      }
    });
    const streamsData = await streamsResp.json();
    const stream = streamsData.data && streamsData.data[0];

    // Get chatters count (approx engagement proxy) using login
    let chatEngagement = null;
    try {
      const login = streamer.login;
      const chatResp = await fetch(`${req.headers['x-forwarded-proto'] ? 'https' : 'http'}://${req.headers.host}/api/twitch/chatters?login=${encodeURIComponent(login)}`);
      const chatData = await chatResp.json();
      chatEngagement = chatData.chatterCount ?? null;
    } catch (_) {}

    await prisma.snapshot.create({
      data: {
        streamerId: streamer.id,
        followers: null,
        subscribers: null,
        chatEngagement,
        viewerCount: stream ? stream.viewer_count : null,
      }
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Snapshot error:', err);
    res.status(500).json({ message: 'Snapshot failed' });
  }
}


