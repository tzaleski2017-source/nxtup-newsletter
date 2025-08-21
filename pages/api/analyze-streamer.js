export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username } = req.body;

  try {
    // Get Twitch OAuth token first
    const authResponse = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`
    });
    
    const authData = await authResponse.json();
    const accessToken = authData.access_token;

    // Get user info
    const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
      headers: {
        'Client-Id': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const userData = await userResponse.json();
    
    if (!userData.data || userData.data.length === 0) {
      return res.status(404).json({ message: 'Streamer not found' });
    }

    const user = userData.data[0];
    
    // Get follower count
    const followersResponse = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${user.id}`, {
      headers: {
        'Client-Id': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const followersData = await followersResponse.json();

    // Basic analysis (you'll enhance this with AI later)
    const analysis = {
      username: user.display_name,
      followers: followersData.total || 0,
      profileImage: user.profile_image_url,
      createdAt: user.created_at,
      description: user.description,
      // TODO: Add AI analysis here
      aiInsight: "Basic analysis - AI insights coming soon!",
      growthPotential: "To be determined by AI analysis"
    };

    return res.status(200).json(analysis);

  } catch (error) {
    console.error('Error analyzing streamer:', error);
    return res.status(500).json({ message: 'Error analyzing streamer' });
  }
}
