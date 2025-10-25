import React from "react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { Smartphone, Tablet, Monitor, Palette, Zap, Shield, ArrowRight, MessageCircle } from "lucide-react"

export default function MobileDemo() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="section-spacing-lg bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>

        <div className="container-responsive relative z-10">
          <div className="max-w-5xl mx-auto text-center google-fade-in">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8 shadow-lg">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
              Mobile UI Components
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 sm:mb-8 leading-tight tracking-tight">
              Modern Mobile UI/UX
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Komponen UI yang dioptimalkan untuk pengalaman mobile terbaik dengan desain modern dan performa tinggi
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/showcase/mobile" 
                className="portfolio-button primary inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <Smartphone className="w-5 h-5" />
                <span>Lihat Demo</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              
              <a 
                href="#features" 
                className="portfolio-button secondary inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
              >
                <span>Fitur Unggulan</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing-lg bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden" id="features">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative">
          <div className="text-center mb-12 sm:mb-16 google-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-6 sm:mb-8 shadow-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Fitur Unggulan
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
              Komponen Mobile Terdepan
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Komponen yang dirancang khusus untuk pengalaman mobile yang optimal dengan teknologi terkini
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Mobile-First Design",
                description: "Dirancang khusus untuk perangkat mobile dengan touch-friendly interactions",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Performance Optimized",
                description: "Komponen ringan dengan animasi yang smooth dan loading yang cepat",
                gradient: "from-blue-600 to-cyan-500",
              },
              {
                icon: <Palette className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Modern Design System",
                description: "Mengikuti tren desain terkini dengan Google AI Studio inspired theme",
                gradient: "from-cyan-500 to-blue-500",
              },
              {
                icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Accessibility Ready",
                description: "Mendukung screen reader dan keyboard navigation untuk semua pengguna",
                gradient: "from-blue-400 to-blue-600",
              },
              {
                icon: <Tablet className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Responsive Layout",
                description: "Tampil sempurna di semua ukuran layar dari mobile hingga desktop",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                icon: <Monitor className="w-6 h-6 sm:w-8 sm:h-8" />,
                title: "Developer Friendly",
                description: "TypeScript support dengan dokumentasi lengkap dan easy to use API",
                gradient: "from-blue-600 to-cyan-500",
              }
            ].map((feature, index) => (
              <div key={index} className="portfolio-card google-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="space-y-4 sm:space-y-6">
                  <div className={`inline-flex p-3 sm:p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl shadow-lg`}>
                    <div className="text-white flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <h3 className="portfolio-title text-lg sm:text-xl">
                      {feature.title}
                    </h3>
                    <p className="portfolio-description">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Cards Section */}
      <section className="section-spacing-lg bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative">
          <div className="text-center mb-12 sm:mb-16 google-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-6 sm:mb-8 shadow-lg">
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
              Component Preview
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
              Komponen Unggulan
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Lihat beberapa contoh komponen mobile yang tersedia dengan desain modern
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
                title: "Mobile Card",
                subtitle: "Interactive card component",
                description: "Card component yang dioptimalkan untuk mobile dengan hover effects dan responsive design.",
                buttonText: "Explore",
                gradient: "from-blue-500 to-blue-600",
              },
              {
                icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
                title: "Mobile Button",
                subtitle: "Touch-optimized buttons",
                description: "Button dengan berbagai variant dan size yang touch-friendly untuk mobile devices.",
                buttonText: "Try It",
                gradient: "from-blue-600 to-cyan-500",
              },
              {
                icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
                title: "Mobile Forms",
                subtitle: "Mobile-first form inputs",
                description: "Form components yang dioptimalkan untuk input mobile dengan validation dan accessibility.",
                buttonText: "Demo",
                gradient: "from-cyan-500 to-blue-500",
              }
            ].map((card, index) => (
              <div key={index} className="portfolio-card google-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${card.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    {card.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="portfolio-title text-base sm:text-lg mb-1">{card.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{card.subtitle}</p>
                  </div>
                </div>
                <p className="portfolio-description mb-4 sm:mb-6">
                  {card.description}
                </p>
                <button className={`w-full py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r ${card.gradient} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 text-sm sm:text-base`}>
                  {card.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
                Siap Memulai?
              </h2>
              <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                Mulai gunakan komponen mobile UI yang modern dan responsif untuk project Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/showcase/mobile" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-blue-200 bg-white/50 hover:bg-white/80 text-blue-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <span>View Documentation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}