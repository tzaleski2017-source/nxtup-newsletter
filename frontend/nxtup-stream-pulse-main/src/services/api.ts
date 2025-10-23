// API service layer for backend integration
// Replace these mock functions with actual API calls

import { Streamer, SubscriptionData, ApiResponse, FeaturedStreamersResponse, SubscriptionResponse } from '@/types';

// Base API configuration (Vite exposes env via import.meta.env)
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// API functions for backend integration

export const streamersApi = {
  // Get featured streamers
  getFeatured: async (): Promise<Streamer[]> => {
    try {
      const response = await apiCall<FeaturedStreamersResponse>('/streamers/featured');
      const data: any = response as any;
      const apiStreamers = (data.streamers || (data.data && data.data.streamers)) as Streamer[] | undefined;
      if (apiStreamers && Array.isArray(apiStreamers) && apiStreamers.length > 0) {
        return apiStreamers;
      }
      // fallthrough to mock if empty
    } catch (_) {
      // ignore and return mock below
    }
    // Fallback mock data to keep UI populated during integration
    return [
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
  },

  // Get individual streamer (for future use)
  getById: async (id: number): Promise<Streamer> => {
    const response = await apiCall<Streamer>(`/streamers/${id}`);
    return response.data;
  }
};

export const subscriptionApi = {
  // Subscribe to newsletter
  subscribe: async (data: SubscriptionData): Promise<boolean> => {
    const response = await apiCall<SubscriptionResponse>('/subscribe', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const anyResp: any = response as any;
    return Boolean(anyResp.subscribed || (anyResp.data && anyResp.data.subscribed));
  }
};

// Analytics tracking (optional)
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // Send to backend analytics endpoint; ignore failures in UI
    fetch(`${API_BASE_URL}/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, properties }),
    }).catch(() => {});
  }
};

// Temporary Twitch API shim to satisfy Admin page build
export const twitchApi = {
  /**
   * Returns filtered Twitch rows. This is a stub to prevent build errors.
   * Replace with a real backend endpoint when available.
   */
  filterByGrowthAndFollowers: async (_params: Record<string, any> = {}): Promise<Array<Record<string, any>>> => {
    try {
      // Attempt to reuse list endpoint as a best-effort source
      const response = await fetch(`${API_BASE_URL}/twitch/list`);
      const data = await response.json();
      const rows: Array<Record<string, any>> = data?.streamers || [];
      return rows;
    } catch {
      return [];
    }
  }
};