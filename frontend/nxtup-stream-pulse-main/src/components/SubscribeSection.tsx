import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle } from "lucide-react";
import { subscriptionApi, analytics } from "@/services/api";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address to subscribe.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await subscriptionApi.subscribe({ email });
      
      if (success) {
        setIsSubmitted(true);
        analytics.track('newsletter_subscribed', { email });
        toast({
          title: "Welcome to NXTUP!",
          description: "You've successfully subscribed to the NXTUP Report.",
        });
        
        // Reset after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setEmail("");
        }, 3000);
      } else {
        toast({
          title: "Subscription failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="gradient-border p-12 bg-gradient-card">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold gradient-text mb-4">
              You're In!
            </h2>
            <p className="text-muted-foreground text-lg">
              Welcome to the insider's guide to Twitch's rising stars. Your first NXTUP Report is on the way.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="subscribe" className="py-24 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="gradient-border p-12 bg-gradient-card">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-primary/20 flex items-center justify-center mx-auto">
              <Mail className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-black gradient-text mb-4">
            Subscribe to the NXTUP Report
          </h2>
          
          {/* Description */}
          <p className="text-muted-foreground mb-8 text-lg">
            Get weekly insights on Twitch's fastest-growing streamers, backed by real-time data and insider analysis.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 h-14 text-lg bg-secondary/50 border-primary/20 focus:border-primary/50 placeholder:text-muted-foreground/60"
              />
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="h-14 px-8 text-lg font-semibold bg-gradient-primary hover:opacity-90 border-0 shadow-glow hover:shadow-intense transition-all duration-300 sm:w-auto w-full disabled:opacity-50"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
              Free weekly reports
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
              Unsubscribe anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
              No spam, ever
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;