import { prisma } from '../_db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  const streamers = await prisma.streamer.findMany({
    select: {
      id: true,
      login: true,
      displayName: true,
      language: true,
      profileImageUrl: true,
      createdAt: true,
      updatedAt: true,
      snapshots: { orderBy: { createdAt: 'desc' }, take: 1, select: { followers: true, subscribers: true, chatEngagement: true, viewerCount: true, createdAt: true } }
    }
  });
  res.status(200).json({ streamers });
}




