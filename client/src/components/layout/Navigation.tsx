import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  
  // Active section tracking
  const sectionIds = ['product', 'team', 'testimonials', 'pricing'];
  const activeSection = useActiveSection(sectionIds);
  
  // Enable smooth scrolling
  useSmoothScroll({ offset: 80 });
  
  const menuItems = [
    { label: "Produk", href: "/#product" },
    { label: "Gallery", href: "/gallery" },
    { label: "Tim", href: "/#team" },
    { label: "Testimoni", href: "/#testimonials" },
    { label: "Harga", href: "/#pricing" },
    { label: "Mobile UI", href: "/mobile-showcase" },
    { label: "Tentang", href: "/about" },
    { label: "Kontak", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border backdrop-blur-xl bg-background/95 shadow-sm google-fade-in" aria-label="Main navigation">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400"
      >
        Skip to main content
      </a>
      
      <div className="max-w-7xl mx-auto container-mobile">
        <div className="flex items-center justify-between h-16 md:h-18">
          <div className="flex items-center gap-2 google-slide-up">
            <a href="/" className="flex items-center gap-2" aria-label="Hadi Origin Home">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-sm" aria-hidden="true">HO</span>
              </div>
              <span className="google-heading text-lg">
                Hadi Origin
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 google-fade-in" role="navigation">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 relative group ${
                  item.href.includes(activeSection) 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
                aria-current={item.href.includes(activeSection) ? 'page' : undefined}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-200 ${
                  item.href.includes(activeSection) ? 'w-full' : 'w-0 group-hover:w-full'
                }`} aria-hidden="true"></span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 google-fade-in">
            {user ? (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a href="/admin">
                  Dashboard
                </a>
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                asChild
                data-testid="button-login"
              >
                <a href="/auth" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </a>
              </Button>
            )}
            <Button
              size="sm"
              asChild
              data-testid="button-start-trial"
            >
              <a href="/contact">
                Mulai Gratis
              </a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden transition-all duration-200 google-slide-up"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border/40 animate-slide-up bg-background/95 backdrop-blur-xl" role="menu">
            <div className="flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-2 transition-all duration-300 hover:translate-x-1 ${
                    item.href.includes(activeSection)
                      ? 'text-primary bg-primary/10 font-semibold border-l-2 border-primary'
                      : 'text-foreground/80 hover:text-primary hover:bg-accent/50'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={item.href.includes(activeSection) ? 'page' : undefined}
                  role="menuitem"
                >
                  <span className="flex-1">{item.label}</span>
                  {item.href.includes(activeSection) && (
                    <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
                  )}
                </a>
              ))}
              
              <div className="border-t border-border/40 mt-4 pt-4 mx-2">
                <div className="flex flex-col gap-2">
                  {user ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start h-12 text-sm"
                      asChild
                    >
                      <a href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-primary text-xs font-medium">DB</span>
                        </div>
                        Dashboard
                      </a>
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start h-12 text-sm"
                      asChild
                      data-testid="button-mobile-login"
                    >
                      <a href="/auth" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                          <LogIn className="w-4 h-4 text-muted-foreground" />
                        </div>
                        Login
                      </a>
                    </Button>
                  )}
                  <Button
                    size="sm"
                    className="w-full h-12 text-sm bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    asChild
                    data-testid="button-mobile-start-trial"
                  >
                    <a href="/contact" className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-medium">🚀</span>
                      </div>
                      Mulai Gratis
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
