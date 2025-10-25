import { Card } from "@/components/ui/card";
import { MessageSquare, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Konsultasi & Planning",
    description: "Diskusi kebutuhan bisnis, analisis target audience, dan perencanaan project yang detail.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Design & Development",
    description: "Pembuatan desain UI/UX dan development menggunakan teknologi modern seperti React, Next.js, dan React Native.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Testing & Launch",
    description: "Quality assurance, testing menyeluruh, deployment ke production, dan maintenance berkelanjutan.",
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-white" id="solutions">
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium shadow-xl">
            <Rocket className="w-5 h-5" />
            Proses Kerja
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
            Dari Konsep ke Solusi Digital
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Proses pengembangan website dan aplikasi yang terstruktur untuk hasil maksimal dan kepuasan klien
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const gradients = [
              'from-blue-500 to-blue-600',
              'from-blue-600 to-cyan-500', 
              'from-cyan-500 to-blue-500'
            ];
            
            return (
              <Card
                key={step.number}
                className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white group"
                data-testid={`card-step-${index + 1}`}
              >
                <div className="space-y-6">
                  {/* Icon and Number */}
                  <div className="flex items-center gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-300 font-mono">{step.number}</div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
