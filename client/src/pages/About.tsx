import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Lightbulb, Users, Award, Rocket, Heart, MessageCircle, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-spacing-lg bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative z-10">
          <div className="max-w-5xl mx-auto text-center google-fade-in">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8 shadow-lg">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              Tentang Kami
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight tracking-tight">
              Membangun Solusi{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Web & Mobile</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>untuk Masa Depan Bisnis
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Tim developer profesional dengan 5+ tahun pengalaman membantu 50+ bisnis Indonesia berkembang melalui solusi digital yang inovatif.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="portfolio-button primary inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Hubungi Kami</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="/#portfolio" 
                className="portfolio-button secondary inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg"
              >
                <span>Lihat Portfolio</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-spacing-lg bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="portfolio-card google-fade-in">
              <div className="space-y-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="portfolio-title text-2xl sm:text-3xl">Misi Kami</h2>
                <p className="portfolio-description">
                  Memberdayakan bisnis dengan solusi <strong>web development</strong> dan <strong>mobile app development</strong> yang inovatif dan user-friendly. 
                  Kami berkomitmen menghadirkan website responsif dan aplikasi mobile yang tidak hanya modern, 
                  tetapi juga fungsional dan memberikan ROI yang nyata bagi bisnis klien.
                </p>
              </div>
            </div>

            <div className="portfolio-card google-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-6">
                <div className="inline-flex p-4 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl shadow-lg">
                  <Lightbulb className="w-8 h-8 text-white" />
                </div>
                <h2 className="portfolio-title text-2xl sm:text-3xl">Visi Kami</h2>
                <p className="portfolio-description">
                  Menjadi partner teknologi terpercaya yang membantu perusahaan Indonesia 
                  berkembang melalui solusi <strong>web development</strong> dan <strong>mobile app development</strong>. Kami ingin setiap bisnis, besar atau kecil, 
                  dapat memiliki website yang powerful dan aplikasi mobile yang mendukung growth bisnis mereka.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing-lg bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative">
          <div className="text-center mb-12 sm:mb-16 google-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-6 sm:mb-8 shadow-lg">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
              Nilai-Nilai Kami
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
              Prinsip Kami
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Prinsip yang memandu setiap keputusan dan tindakan kami dalam memberikan layanan terbaik
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Rocket,
                title: "Teknologi Terdepan",
                description: "Menggunakan framework dan tools terbaru seperti React, Next.js, React Native untuk hasil yang optimal.",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: Users,
                title: "User-Centered Design",
                description: "Setiap website dan aplikasi yang kami buat mengutamakan pengalaman pengguna yang intuitif dan engaging.",
                gradient: "from-blue-600 to-cyan-500"
              },
              {
                icon: Award,
                title: "Code Quality",
                description: "Komitmen pada clean code, best practices, dan testing untuk memastikan website dan app yang reliable.",
                gradient: "from-cyan-500 to-blue-500"
              }
            ].map((value, index) => (
              <div key={index} className="portfolio-card google-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="space-y-4 sm:space-y-6">
                  <div className={`inline-flex p-3 sm:p-4 bg-gradient-to-br ${value.gradient} rounded-2xl shadow-lg`}>
                    <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="portfolio-title text-xl sm:text-2xl">{value.title}</h3>
                  <p className="portfolio-description">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: "30+", label: "Klien Puas", gradient: "from-blue-500 to-blue-600" },
              { value: "50+", label: "Website & App", gradient: "from-blue-600 to-cyan-500" },
              { value: "5+", label: "Tahun Pengalaman", gradient: "from-cyan-500 to-blue-500" },
              { value: "100%", label: "Responsive Design", gradient: "from-blue-400 to-blue-600" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border-0 rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <div className={`text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      {stat.value}
                    </div>
                    <div className="text-base md:text-lg text-gray-600 font-medium">
                      {stat.label}
                    </div>
                    
                    {/* Bottom accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl p-12 shadow-2xl animate-slide-up">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6 leading-tight">
                Siap Memulai Proyek Anda?
              </h2>
              <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                Mari diskusikan bagaimana kami dapat membantu bisnis Anda berkembang dengan <strong>website responsif</strong> dan <strong>aplikasi mobile</strong> yang tepat sasaran
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Hubungi Kami</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
                <a 
                  href="/#portfolio" 
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-blue-200 bg-white/50 hover:bg-white/80 text-blue-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                >
                  <span>Lihat Portfolio</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
