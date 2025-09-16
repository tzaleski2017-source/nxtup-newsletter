import { useState, useEffect } from "react";
import { Star, TrendingUp, Users, Eye } from "lucide-react";
import { Streamer } from "@/types";
import { streamersApi, analytics } from "@/services/api";

const FeaturedStreamers = () => {
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStreamers = async () => {
      try {
        const data = await streamersApi.getFeatured();
        setStreamers(data);
        analytics.track('featured_streamers_loaded', { count: data.length });
      } catch (error) {
        console.error('Failed to load streamers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStreamers();
  }, []);

  const handleStreamerClick = (streamer: Streamer) => {
    analytics.track('streamer_card_clicked', {
      streamer_id: streamer.id,
      streamer_name: streamer.name,
    });
  };

  const renderStars = (rating: number) => {
    const stars = Math.floor(rating / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < stars ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black gradient-text mb-4">
            This Week's Rising Streamers
          </h2>
          <p className="text-xl text-muted-foreground">
            Data-driven discoveries from Twitch's fastest-growing creators
          </p>
        </div>

        {/* Streamers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-gradient-card rounded-2xl p-8 animate-pulse">
                <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-6" />
                <div className="h-8 bg-muted rounded mb-4" />
                <div className="h-4 bg-muted rounded mb-2" />
                <div className="h-4 bg-muted rounded mb-6" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-16 bg-muted rounded" />
                  <div className="h-16 bg-muted rounded" />
                  <div className="h-16 bg-muted rounded" />
                </div>
              </div>
            ))
          ) : (
            streamers.map((streamer) => (
            <div
              key={streamer.id}
              onClick={() => handleStreamerClick(streamer)}
              className="group relative bg-gradient-card rounded-2xl p-8 card-glow hover:shadow-intense transition-all duration-500 gradient-border cursor-pointer"
            >
              {/* Profile Image */}
              <div className="relative mb-6 flex justify-center">
                <div className="relative">
                  <img
                    src={streamer.image}
                    alt={streamer.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-primary rounded-full p-2">
                    <TrendingUp className="w-4 h-4 text-black" />
                  </div>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-2xl font-bold text-center mb-2 group-hover:gradient-text transition-all duration-300">
                {streamer.name}
              </h3>

              {/* Bio */}
              <div className="text-center mb-6 space-y-1">
                <p className="text-muted-foreground">{streamer.bio}</p>
                <p className="text-muted-foreground text-sm">{streamer.bioSecond}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center mb-6 space-x-2">
                <div className="flex space-x-1">
                  {renderStars(streamer.rating)}
                </div>
                <span className="text-lg font-semibold gradient-text">
                  {streamer.rating}/100
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary mr-1" />
                  </div>
                  <p className="text-lg font-semibold">{streamer.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <Eye className="w-4 h-4 text-accent mr-1" />
                  </div>
                  <p className="text-lg font-semibold">{streamer.avgViewers}</p>
                  <p className="text-xs text-muted-foreground">Avg Viewers</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  </div>
                  <p className="text-lg font-semibold text-green-400">{streamer.growth}</p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStreamers;