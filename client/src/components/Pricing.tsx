import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Rp 1.500.000",
    period: "/ proyek",
    description: "Dashboard dasar untuk bisnis yang baru memulai",
    features: [
      "Dashboard dasar",
      "Integrasi 3 API",
      "Real-time analytics",
      "Email support",
      "1 user account",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "Rp 4.500.000",
    period: "/ proyek",
    description: "Solusi lengkap untuk bisnis yang berkembang",
    features: [
      "Advanced dashboard",
      "Unlimited API integration",
      "AI/ML integration",
      "Priority support",
      "Up to 10 users",
      "Custom analytics",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Solusi khusus untuk kebutuhan enterprise",
    features: [
      "Custom AI development",
      "Dedicated support team",
      "On-premise deployment",
      "Unlimited users",
      "SLA guarantee",
      "Training & consultation",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="google-section bg-background google-fade-in" id="pricing">
      <div className="google-container">
        <div className="text-center space-y-4 mb-16 google-slide-up">
          <h2 className="google-heading text-2xl sm:text-3xl md:text-4xl">
            Paket Harga
          </h2>
          <p className="google-body text-sm sm:text-base max-w-2xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="google-grid google-grid-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`google-card-elevated transition-all duration-200 google-fade-in group ${
                plan.highlighted
                  ? "ring-2 ring-primary/20 shadow-lg"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <h3 className={`google-subheading text-lg ${plan.highlighted ? 'text-primary' : ''}`}>
                    {plan.name}
                  </h3>
                  <p className="google-body text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <div className={`text-2xl font-semibold font-mono ${plan.highlighted ? 'text-primary' : 'text-foreground'}`}>
                    {plan.price}
                  </div>
                  {plan.period && (
                    <div className="text-sm text-muted-foreground">{plan.period}</div>
                  )}
                </div>

                <Button
                  size="lg"
                  variant={plan.highlighted ? "default" : "outline"}
                  className="w-full"
                >
                  {plan.name === "Enterprise" ? "Hubungi Kami" : "Jadwalkan Demo Gratis"}
                </Button>

                <div className="space-y-3 pt-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${(index * 0.1) + (idx * 0.05)}s` }}>
                      <div className={`mt-0.5 p-1 rounded-full ${plan.highlighted ? 'bg-blue-100' : 'bg-green-100'}`}>
                        <Check className={`w-3 h-3 ${plan.highlighted ? 'text-blue-600' : 'text-green-600'}`} />
                      </div>
                      <span className={`text-mobile-sm ${plan.highlighted ? 'text-slate-700' : 'text-slate-600'} group-hover:text-slate-800 transition-colors duration-300`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
