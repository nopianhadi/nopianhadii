import { Briefcase, Bot, Clock, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    value: "25+",
    label: "Bisnis telah menggunakan dashboard saya",
  },
  {
    icon: Bot,
    value: "10+",
    label: "Sistem AI diintegrasikan",
  },
  {
    icon: Clock,
    value: "90%",
    label: "Waktu analisis manual dihemat",
  },
  {
    icon: TrendingUp,
    value: "3x",
    label: "Rata-rata ROI meningkat dalam 6 bulan",
  },
];

export default function Statistics() {
  return (
    <section className="py-24 md:py-32 bg-card/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Hasil yang Nyata
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data nyata dari proyek-proyek yang telah diselesaikan
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4"
                data-testid={`stat-${index + 1}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-chart-1 to-chart-2 mb-2">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-1">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-chart-1 to-chart-3 bg-clip-text text-transparent font-mono">
                    {stat.value}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
