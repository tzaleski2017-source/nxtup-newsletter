import HeroSection from "@/components/HeroSection";
import FeaturedStreamers from "@/components/FeaturedStreamers";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturedStreamers />
      <SubscribeSection />
      <Footer />
    </div>
  );
};

export default Index;