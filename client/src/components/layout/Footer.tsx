import { Github, Linkedin, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const quickLinks = [
    { label: "Layanan", href: "/#product" },
    { label: "Tim", href: "/#team" },
    { label: "Testimoni", href: "/#testimonials" },
    { label: "Harga", href: "/#pricing" },
    { label: "Tentang", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ];

  return (
    <footer className="border-t border-blue-200/30 bg-gradient-to-br from-blue-50 via-blue-100/50 to-cyan-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
      
      <div className="google-container py-12 md:py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4 google-fade-in">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-medium text-sm">HO</span>
              </div>
              <span className="google-heading text-lg bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Hadi Origin
              </span>
            </div>
            <p className="google-body text-sm text-blue-700/80">
              Digital agency yang mengkhususkan diri dalam web development dan app development untuk mengembangkan bisnis Anda.
            </p>
          </div>

          <div className="space-y-4 google-fade-in">
            <h3 className="google-subheading text-base text-blue-800 font-semibold">Link Cepat</h3>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="google-body text-sm text-blue-700/70 hover:text-blue-600 transition-all duration-200 hover:translate-x-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`link-footer-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 animate-fade-in">
            <h3 className="font-semibold text-mobile-base text-blue-800">Hubungi Saya</h3>
            <div className="space-y-3">
              <a
                href="mailto:nopianhadi2@gmail.com"
                className="flex items-center gap-2 text-mobile-sm text-blue-700/70 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4" />
                nopianhadi2@gmail.com
              </a>
              <a
                href="https://wa.me/62895406181407"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-mobile-sm text-blue-700/70 hover:text-green-600 transition-all duration-300 hover:translate-x-1"
                data-testid="link-whatsapp"
              >
                <MessageCircle className="w-4 h-4" />
                +62 895-4061-81407
              </a>
              <a
                href="tel:+62895406181407"
                className="flex items-center gap-2 text-mobile-sm text-blue-700/70 hover:text-blue-600 transition-all duration-300 hover:translate-x-1"
                data-testid="link-phone"
              >
                <Phone className="w-4 h-4" />
                +62 895-4061-81407
              </a>
              <div className="flex gap-2 pt-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-blue-50 hover:text-blue-600"
                  data-testid="button-linkedin"
                  asChild
                >
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-900 hover:text-white"
                  data-testid="button-github"
                  asChild
                >
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              <div className="pt-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  asChild
                  data-testid="button-contact-us"
                >
                  <a href="/contact">
                    Hubungi Kami
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-blue-200/50 text-center animate-fade-in">
          <p className="text-mobile-sm text-blue-700/60">
            © 2025 Hadi Origin. Ingin website atau aplikasi mobile untuk bisnismu? Yuk, mulai dari konsultasi gratis.
          </p>
        </div>
      </div>
    </footer>
  );
}
