// pages/api/breakout-candidates.js

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch the latest breakout candidates from your GitHub backend
    const response = await fetch(
      'https://raw.githubusercontent.com/tzaleski2017-source/nxtup-backend/main/output/breakout_candidates.csv'
    );

    if (!response.ok) {
      // If file doesn't exist yet (waiting for AI to run)
      return res.status(200).json({
        candidates: [],
        message: 'AI predictions coming soon! Check back in 24 hours.',
        status: 'pending'
      });
    }

    const csvText = await response.text();
    
    // Parse CSV into JSON
    const lines = csvText.split('\n');
    const headers = lines[0].split(',');
    
    const candidates = lines.slice(1)
      .filter(line => line.trim())
      .map(line => {
        const values = line.split(',');
        const candidate = {};
        headers.forEach((header, index) => {
          candidate[header.trim()] = values[index]?.trim();
        });
        return candidate;
      })
      .filter(c => c.user_login) // Filter out empty rows
      .slice(0, 50); // Top 50

    return res.status(200).json({
      candidates,
      count: candidates.length,
      lastUpdated: new Date().toISOString(),
      status: 'active'
    });

  } catch (error) {
    console.error('Error fetching breakout candidates:', error);
    return res.status(500).json({
      candidates: [],
      message: 'Error loading predictions. Please try again later.',
      status: 'error'
    });
  }
}