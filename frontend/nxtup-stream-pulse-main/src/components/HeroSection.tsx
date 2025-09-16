import { Button } from "@/components/ui/button";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-gradient bg-[length:400%_400%]" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <h1 className="text-8xl md:text-9xl font-black gradient-text tracking-tighter">
            NXTUP
          </h1>
        </div>
        
        {/* Tagline */}
        <p className="text-2xl md:text-3xl font-medium text-muted-foreground mb-12 text-balance">
          Where live data meets discovery
        </p>
        
        {/* CTA Button */}
        <Button
          size="lg"
          className="px-8 py-4 text-lg font-semibold bg-gradient-primary hover:opacity-90 border-0 shadow-glow hover:shadow-intense transition-all duration-300 transform hover:scale-105"
          onClick={() => {
            const el = document.getElementById('subscribe');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        >
          Subscribe to NXTUP
        </Button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;