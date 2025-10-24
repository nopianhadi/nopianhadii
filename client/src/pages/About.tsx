import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Lightbulb, Users, Award, Rocket, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 section-mobile">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)] animate-fade-in" />
        
        <div className="max-w-7xl mx-auto container-mobile relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <Badge className="inline-flex items-center gap-2 bg-purple-100/80 text-purple-700 border-purple-200/50 glass hover:bg-purple-200/80 transition-all duration-300 mb-6">
              <Heart className="w-3.5 h-3.5" />
              Tentang Kami
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Membangun Solusi{" "}
              <span className="gradient-text-primary">AI & Dashboard</span>
              <br />
              untuk Masa Depan Bisnis
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kami adalah tim profesional yang berdedikasi untuk menghadirkan solusi teknologi AI terbaik. 
              Dengan pengalaman lebih dari 10 tahun, kami telah membantu 50+ perusahaan bertransformasi digital.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-mobile bg-white">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <Card className="glass-card-mobile p-8 animate-slide-up">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-200/30 flex items-center justify-center">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold gradient-text-accent">Misi Kami</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Memberdayakan bisnis dengan teknologi AI yang inovatif dan mudah digunakan. 
                  Kami berkomitmen untuk menghadirkan solusi yang tidak hanya canggih, tetapi juga 
                  praktis dan memberikan ROI yang nyata.
                </p>
              </div>
            </Card>

            <Card className="glass-card-mobile p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-200/30 flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-2xl font-bold gradient-text-accent">Visi Kami</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi partner teknologi terpercaya yang membantu perusahaan Indonesia 
                  berkembang melalui inovasi AI. Kami ingin setiap bisnis, besar atau kecil, 
                  dapat memanfaatkan kekuatan artificial intelligence.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-mobile bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-12 md:mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text-accent">
              Nilai-Nilai Kami
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Prinsip yang memandu setiap keputusan dan tindakan kami
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Rocket,
                title: "Inovasi",
                description: "Selalu mencari cara baru dan lebih baik untuk menyelesaikan masalah dengan teknologi terkini."
              },
              {
                icon: Users,
                title: "Kolaborasi",
                description: "Bekerja sama dengan klien sebagai partner untuk mencapai tujuan bersama."
              },
              {
                icon: Award,
                title: "Kualitas",
                description: "Komitmen pada excellence dalam setiap aspek pekerjaan kami, dari code hingga customer service."
              }
            ].map((value, index) => (
              <Card 
                key={index} 
                className="glass-card-mobile p-6 animate-slide-up hover:scale-[1.03] transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-200/30 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-mobile bg-white">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "50+", label: "Klien Puas" },
              { value: "100+", label: "Proyek Selesai" },
              { value: "10+", label: "Tahun Pengalaman" },
              { value: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-mobile bg-gradient-to-br from-blue-50/30 to-purple-50/30">
        <div className="max-w-4xl mx-auto container-mobile text-center">
          <div className="glass-card p-8 md:p-12 rounded-2xl animate-slide-up">
            <h2 className="text-2xl md:text-3xl font-bold gradient-text-primary mb-4">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Mari diskusikan bagaimana kami dapat membantu bisnis Anda berkembang dengan solusi AI yang tepat
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                Hubungi Kami
              </a>
              <a 
                href="/#projects" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-lg border-2 border-border bg-transparent hover:bg-accent hover:text-accent-foreground font-semibold shadow-sm hover:shadow-md transition-all duration-300"
              >
                Lihat Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
