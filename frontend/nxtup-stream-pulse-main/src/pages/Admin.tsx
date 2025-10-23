import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { twitchApi } from '@/services/api';

const Admin = () => {
  const [backendBase] = useState<string>((import.meta as any).env?.VITE_API_URL || '/api');
  const [streamers, setStreamers] = useState<any[]>([]);
  const [broadcasterId, setBroadcasterId] = useState('');
  const [metrics, setMetrics] = useState<Record<string, any>>({});

  const load = async () => {
    try {
      const res = await fetch(`${backendBase}/twitch/list`);
      const data = await res.json();
      setStreamers(data.streamers || []);

      // Enrich with growth metrics from filter endpoint
      const filtered = await twitchApi.filterByGrowthAndFollowers({ language: 'en' });
      const map: Record<string, any> = {};
      for (const row of filtered) {
        map[row.id] = row;
      }
      setMetrics(map);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, []);

  const startOAuth = () => {
    window.location.href = `${backendBase}/twitch/oauth-start`;
  };

  const snapshot = async () => {
    if (!broadcasterId) return;
    await fetch(`${backendBase}/twitch/snapshot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ broadcaster_id: broadcasterId })
    });
    await load();
  };

  const runFilter = async () => {
    const rows = await twitchApi.filterByGrowthAndFollowers({ language: 'en', min_followers: 10000, max_followers: 200000 });
    console.log('Filtered:', rows);
    alert(`Fetched ${rows.length} filtered streamers (check console)`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin</h1>
      <div className="flex gap-2">
        <Button onClick={startOAuth}>Authorize Twitch Channel</Button>
        <Button variant="secondary" onClick={runFilter}>Run Filter (en, 10k-200k)</Button>
      </div>
      <div className="flex gap-2 items-center">
        <Input placeholder="Broadcaster ID" value={broadcasterId} onChange={(e) => setBroadcasterId(e.target.value)} />
        <Button onClick={snapshot}>Create Snapshot</Button>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Authorized Streamers</h2>
        {streamers.map((s) => {
          const m = metrics[s.id];
          return (
            <div key={s.id} className="p-4 border rounded grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
              <div>
                <div className="font-medium">{s.displayName} (@{s.login})</div>
                <div className="text-sm text-muted-foreground">ID: {s.id}</div>
              </div>
              <div className="text-sm">
                <div>Followers: {m?.followers ?? '—'}</div>
                <div>Subscribers: {m?.subscribers ?? '—'}</div>
                <div>Viewers: {m?.viewerCount ?? s.snapshots?.[0]?.viewerCount ?? '—'}</div>
              </div>
              <div className="text-sm">
                <div>Follower Growth %: {m?.followerGrowthPercent != null ? m.followerGrowthPercent.toFixed(2) : '—'}</div>
                <div>Viewer Growth %: {m?.viewerGrowthPercent != null ? m.viewerGrowthPercent.toFixed(2) : '—'}</div>
                <div>Chat Engagement: {m?.chatEngagement ?? '—'}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;


