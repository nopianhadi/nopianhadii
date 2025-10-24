import { Brain, Zap, Link2, FileText, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Integrasi AI/ML Frameworks",
    description: "OpenAI, Gemini, Ollama, dan framework AI lainnya siap terintegrasi",
    variant: "blue" as const,
  },
  {
    icon: Zap,
    title: "Real-time Analytics",
    description: "Laporan dan analitik interaktif yang update secara real-time",
    variant: "orange" as const,
  },
  {
    icon: Link2,
    title: "Unlimited API Integration",
    description: "Hubungkan dengan sistem internal bisnis tanpa batas",
    variant: "purple" as const,
  },
  {
    icon: FileText,
    title: "Automated Reports",
    description: "Otomatisasi laporan untuk efisiensi maksimal",
    variant: "green" as const,
  },
  {
    icon: Users,
    title: "Multi-User Support",
    description: "Dukungan multi-user dengan role management lengkap",
    variant: "blue" as const,
  },
  {
    icon: Shield,
    title: "Secure & Fast",
    description: "Deployment cepat dan aman dengan best practices",
    variant: "orange" as const,
  },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-background" id="product">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 google-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4 google-slide-up bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Fitur Cerdas, Hasil Nyata
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto google-fade-in">
            Dashboard AI tingkat enterprise, dibangun dengan cepat dan efisien
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card border border-card-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group google-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-feature-${index + 1}`}
              >
                {/* Icon Container */}
                <div className="inline-flex p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="w-6 h-6 text-primary transition-colors" />
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
