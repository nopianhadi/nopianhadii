import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Website Basic",
    price: "Rp 2.500.000",
    period: "/ proyek",
    description: "Website company profile untuk bisnis yang baru memulai",
    features: [
      "Responsive design",
      "5 halaman utama",
      "Contact form",
      "SEO optimization",
      "1 tahun maintenance",
    ],
    highlighted: false,
  },
  {
    name: "Website Professional",
    price: "Rp 7.500.000",
    period: "/ proyek",
    description: "Website lengkap dengan fitur advanced untuk bisnis berkembang",
    features: [
      "Custom design & development",
      "E-commerce integration",
      "CMS admin panel",
      "Payment gateway",
      "Mobile app (PWA)",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Mobile App",
    price: "Rp 15.000.000",
    period: "/ proyek",
    description: "Aplikasi mobile native untuk iOS dan Android",
    features: [
      "Cross-platform development",
      "Custom UI/UX design",
      "API integration",
      "Push notifications",
      "App store deployment",
      "3 bulan maintenance",
    ],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50" id="pricing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Paket Harga
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pilih paket yang sesuai dengan kebutuhan bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white group ${
                plan.highlighted
                  ? "ring-2 ring-blue-500 shadow-lg scale-105"
                  : ""
              }`}
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
                  {plan.name === "Mobile App" ? "Konsultasi Gratis" : "Mulai Proyek"}
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
