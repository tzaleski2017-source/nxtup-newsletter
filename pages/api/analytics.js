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

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { event, properties } = req.body || {};
    // For now, just log; replace with your analytics provider later
    console.log('Analytics event:', event, properties);
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Analytics error:', err);
    res.status(500).json({ ok: false });
  }
}


