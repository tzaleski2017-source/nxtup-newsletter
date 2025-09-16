import { Twitter, Linkedin, Twitch } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h3 className="text-2xl font-black gradient-text">NXTUP</h3>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:shadow-glow group"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-5 h-5 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:shadow-glow group"
              aria-label="Connect on LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:text-primary transition-colors" />
            </a>
            <a
              href="#"
              className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-all duration-300 hover:shadow-glow group"
              aria-label="Follow us on Twitch"
            >
              <Twitch className="w-5 h-5 group-hover:text-primary transition-colors" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm">
            © 2025 NXTUP. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;