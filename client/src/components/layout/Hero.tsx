import { Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/AI_Dashboard_Hero_Mockup_bea0dfd3.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 google-fade-in" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 opacity-30 google-fade-in">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* Content */}
          <div className="space-y-6 google-slide-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/5 text-primary border border-primary/20 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Template AI Terbaik
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight tracking-tight">
                Bangun{" "}
                <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                  Aplikasi AI
                </span>
                <br />
                yang Membentuk Masa Depan
              </h1>

              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                Membantu bisnis membangun aplikasi dan dashboard profesional yang terintegrasi dengan AI.
                Dari analitik, CRM, hingga platform otomasi — dikembangkan cepat dan efisien.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20project%20saya" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 group"
                data-testid="button-consultation"
              >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Konsultasi Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="#product" 
                className="inline-flex items-center justify-center gap-3 px-6 py-3 border border-border bg-background hover:bg-accent text-foreground font-medium rounded-lg transition-all duration-200 group"
                data-testid="button-how-it-works"
              >
                <span>Cara Kerja</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
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
