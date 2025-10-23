import { prisma } from '../_db';

export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const redirectUri = process.env.TWITCH_OAUTH_REDIRECT_URI;

  if (!code || !clientId || !clientSecret || !redirectUri) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  try {
    const tokenResp = await fetch('https://id.twitch.tv/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(redirectUri)}`
    });
    const token = await tokenResp.json();

    const expiresAt = new Date(Date.now() + (token.expires_in || 0) * 1000);

    // Fetch user info associated with this token
    const userResp = await fetch('https://api.twitch.tv/helix/users', {
      headers: {
        'Client-Id': clientId,
        'Authorization': `Bearer ${token.access_token}`
      }
    });
    const userData = await userResp.json();
    const user = userData.data && userData.data[0];
    if (!user) {
      return res.status(500).json({ message: 'Failed to fetch Twitch user' });
    }

    await prisma.streamer.upsert({
      where: { id: String(user.id) },
      update: {
        login: String(user.login),
        displayName: String(user.display_name || user.login),
        profileImageUrl: String(user.profile_image_url || ''),
        language: String(user.broadcaster_type || '') || null,
        updatedAt: new Date(),
        oauth: {
          upsert: {
            create: {
              accessToken: token.access_token,
              refreshToken: token.refresh_token || '',
              expiresAt,
            },
            update: {
              accessToken: token.access_token,
              refreshToken: token.refresh_token || '',
              expiresAt,
            }
          }
        }
      },
      create: {
        id: String(user.id),
        login: String(user.login),
        displayName: String(user.display_name || user.login),
        profileImageUrl: String(user.profile_image_url || ''),
        language: String(user.broadcaster_type || '') || null,
        oauth: {
          create: {
            accessToken: token.access_token,
            refreshToken: token.refresh_token || '',
            expiresAt,
          }
        }
      }
    });

    res.status(200).json({ ok: true, broadcaster_id: String(user.id), login: String(user.login) });
  } catch (err) {
    console.error('OAuth callback error:', err);
    res.status(500).json({ message: 'OAuth error' });
  }
}


