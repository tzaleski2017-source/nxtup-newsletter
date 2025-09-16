// Type definitions for NXTUP frontend

export interface Streamer {
  id: number;
  name: string;
  image: string;
  bio: string;
  bioSecond: string;
  rating: number;
  followers: string;
  avgViewers: string;
  growth: string;
}

export interface SubscriptionData {
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface FeaturedStreamersResponse {
  streamers: Streamer[];
}

export interface SubscriptionResponse {
  subscribed: boolean;
  message: string;
}