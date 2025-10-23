export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  const { login } = req.query;
  if (!login) return res.status(400).json({ message: 'Missing login' });
  try {
    const resp = await fetch(`https://tmi.twitch.tv/group/user/${encodeURIComponent(String(login))}/chatters`);
    if (!resp.ok) return res.status(resp.status).json({ message: 'Failed to fetch chatters' });
    const data = await resp.json();
    const chatterCount = (data && data.chatter_count) || 0;
    res.status(200).json({ login: String(login), chatterCount });
  } catch (err) {
    console.error('Chatters error:', err);
    res.status(500).json({ message: 'Chatters error' });
  }
}




