import { Globe, Smartphone, Zap, Code2, Users, Shield } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Website modern & responsif dengan React, Next.js, dan TypeScript. SEO-optimized untuk performa maksimal dan user experience terbaik.",
    variant: "blue" as const,
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Aplikasi mobile native & cross-platform untuk iOS/Android. React Native dan Flutter untuk solusi mobile yang powerful.",
    variant: "orange" as const,
  },
  {
    icon: Zap,
    title: "E-Commerce Solutions",
    description: "Platform e-commerce lengkap dengan payment gateway, inventory management, dan analytics dashboard untuk boost penjualan online.",
    variant: "purple" as const,
  },
  {
    icon: Code2,
    title: "Custom Web Applications",
    description: "Aplikasi web custom sesuai kebutuhan bisnis. Integrasi sistem kompleks dengan skalabilitas tinggi dan performa optimal.",
    variant: "green" as const,
  },
  {
    icon: Users,
    title: "UI/UX Design & Development",
    description: "Desain antarmuka yang user-friendly dan conversion-focused. Dari wireframe hingga implementasi yang pixel-perfect.",
    variant: "blue" as const,
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    description: "Maintenance berkala, security updates, dan technical support 24/7. Jaminan website & aplikasi selalu optimal dan aman.",
    variant: "orange" as const,
  },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50" id="product">
      
      <div className="container-responsive relative">
        <div className="text-center element-spacing-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-badge-sm font-medium-responsive element-spacing-sm shadow-xl">
            <Zap className="icon-mobile-sm" />
            Layanan Kami
          </div>
          <h2 className="text-section-title font-bold-responsive bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent element-spacing-md leading-tight">
            Layanan Web & App Development Terlengkap
          </h2>
          <p className="text-section-subtitle text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Solusi profesional untuk <strong>web development</strong> dan <strong>mobile app development</strong> 
            yang membantu mengembangkan bisnis Anda dengan teknologi terdepan dan hasil yang terukur
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-responsive-md">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const gradients = {
              blue: 'from-blue-500 to-blue-600',
              orange: 'from-blue-600 to-cyan-500',
              purple: 'from-cyan-500 to-blue-500',
              green: 'from-blue-400 to-blue-600'
            };
            
            return (
              <div key={index} className="group">
                <div
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                  data-testid={`card-feature-${index + 1}`}
                >
                  {/* Icon Container */}
                  <div className="inline-flex p-4 bg-blue-50 rounded-xl mb-4 group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
