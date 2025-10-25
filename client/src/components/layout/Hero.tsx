import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/AI_Dashboard_Hero_Mockup_bea0dfd3.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-white">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

      <div className="container-responsive relative z-10">
        <div className="grid lg:grid-cols-2 gap-responsive-lg items-center min-h-screen section-spacing-lg">
          {/* Content */}
          <div className="space-y-8 google-slide-up">
            <div className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-badge-md font-medium-responsive shadow-xl element-spacing-sm">
              <Sparkles className="icon-mobile-sm" />
              Digital Agency Terpercaya
            </div>

            <div className="space-y-6">
              <h1 className="text-hero-title font-bold-responsive leading-tight tracking-tight element-spacing-md">
                Bangun{" "}
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  Website & Aplikasi
                </span>
                <br />
                yang Mengembangkan Bisnis
              </h1>

              <p className="text-hero-subtitle text-gray-700 max-w-4xl leading-relaxed element-spacing-lg">
                Bangun website & aplikasi mobile yang mengembangkan bisnis Anda dengan teknologi terdepan dan hasil yang terukur.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-responsive-sm">
              <a 
                href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20project%20saya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold-responsive rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group text-button-lg tap-target"
                data-testid="button-consultation"
              >
                <MessageCircle className="icon-mobile-md group-hover:scale-110 transition-transform" />
                <span>Konsultasi Gratis</span>
                <ArrowRight className="icon-mobile-md group-hover:translate-x-2 transition-transform" />
              </a>
              
              <a 
                href="/gallery" 
                className="inline-flex items-center justify-center gap-3 px-6 py-3 sm:px-8 sm:py-4 border-2 border-blue-200 bg-white/80 hover:bg-white text-blue-700 font-semibold-responsive rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group text-button-lg tap-target"
                data-testid="button-portfolio"
              >
                <span>Lihat Portfolio</span>
                <ArrowRight className="icon-mobile-md group-hover:translate-x-2 transition-transform" />
              </a>
            </div>

            {/* Social Proof Stats */}
            <div className="grid grid-cols-3 gap-6 sm:gap-8 mt-12 pt-8 border-t border-blue-100">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">50+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Proyek Selesai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">30+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Klien Puas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">5+</div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">Tahun Pengalaman</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-float">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 rounded-3xl blur-3xl opacity-50" />
              
              {/* Image container */}
              <div className="relative bg-card/50 backdrop-blur-sm border border-card-border rounded-2xl p-3 shadow-2xl google-fade-in">
                <img
                  src={heroImage}
                  alt="AI Dashboard Mockup"
                  className="relative rounded-xl w-full h-auto shadow-lg"
                  data-testid="img-hero-dashboard"
                />
                
                {/* Overlay indicators */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
