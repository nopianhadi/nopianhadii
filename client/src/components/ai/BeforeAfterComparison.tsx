import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  AlertCircle, 
  TrendingDown,
  Zap,
  CheckCircle,
  TrendingUp,
  ArrowRight
} from "lucide-react";

interface BeforeAfterComparisonProps {
  solutionType: string;
}

const comparisonData: Record<string, any> = {
  "Inventory Management": {
    before: [
      { icon: <Clock />, metric: "3 jam/hari", description: "untuk manage inventory manual" },
      { icon: <AlertCircle />, metric: "8-10 hari/bulan", description: "stockout karena tidak ada alert" },
      { icon: <TrendingDown />, metric: "15% modal", description: "nganggur di deadstock" },
      { icon: <AlertCircle />, metric: "Rp 5.4 juta", description: "lost revenue dari stockout (3 bulan)" }
    ],
    after: [
      { icon: <Zap />, metric: "30 menit/hari", description: "hemat 2.5 jam dengan barcode!" },
      { icon: <CheckCircle />, metric: "< 1 hari/bulan", description: "dengan automated reorder alerts" },
      { icon: <TrendingUp />, metric: "3% deadstock", description: "modal dioptimalkan!" },
      { icon: <CheckCircle />, metric: "Rp 0", description: "lost revenue - tidak pernah stockout lagi!" }
    ],
    impact: "+Rp 11.5 juta/bulan"
  },
  "CRM System": {
    before: [
      { icon: <AlertCircle />, metric: "40% leads", description: "hilang karena lupa follow-up" },
      { icon: <Clock />, metric: "2-3 jam/hari", description: "manual input data customer" },
      { icon: <TrendingDown />, metric: "10% conversion", description: "rate dari leads ke closing" },
      { icon: <AlertCircle />, metric: "Data di mana-mana", description: "Excel, notes HP, memory sales" }
    ],
    after: [
      { icon: <CheckCircle />, metric: "90%+ leads", description: "ter-follow-up dengan reminder otomatis" },
      { icon: <Zap />, metric: "30 menit/hari", description: "auto-sync dari WhatsApp & email" },
      { icon: <TrendingUp />, metric: "35% conversion", description: "rate naik karena better follow-up!" },
      { icon: <CheckCircle />, metric: "Centralized", description: "semua data customer di satu tempat" }
    ],
    impact: "+Rp 15 juta/bulan dari increased sales"
  },
  "Dashboard Analytics": {
    before: [
      { icon: <Clock />, metric: "1-2 hari", description: "untuk compile laporan manual" },
      { icon: <AlertCircle />, metric: "Data tidak sync", description: "antar sistem, sering error" },
      { icon: <TrendingDown />, metric: "Keputusan lambat", description: "tunggu laporan mingguan/bulanan" },
      { icon: <AlertCircle />, metric: "Rp 0", description: "insights - hanya lihat angka mentah" }
    ],
    after: [
      { icon: <Zap />, metric: "Real-time", description: "dashboard update otomatis setiap menit" },
      { icon: <CheckCircle />, metric: "Data accurate", description: "single source of truth untuk semua" },
      { icon: <TrendingUp />, metric: "Keputusan cepat", description: "akses data kapan saja dari HP" },
      { icon: <CheckCircle />, metric: "AI insights", description: "trend, forecasting, recommendations" }
    ],
    impact: "+30% better decisions = more profit"
  }
};

export default function BeforeAfterComparison({ solutionType }: BeforeAfterComparisonProps) {
  const data = comparisonData[solutionType] || comparisonData["Inventory Management"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6"
    >
      <Card className="p-6 border-2">
        {/* Header */}
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold mb-2">Transformation Impact</h4>
          <p className="text-gray-600">
            Lihat perubahan yang akan Anda alami setelah implement solusi ini
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* BEFORE Column */}
          <div>
            <Card className="border-2 border-red-200 bg-red-50 p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-red-600 rounded-full">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h5 className="text-xl font-bold text-red-900">❌ Sebelum</h5>
              </div>
              
              <div className="space-y-4">
                {data.before.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200"
                  >
                    <div className="p-2 bg-red-100 rounded-lg text-red-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-red-900">{item.metric}</div>
                      <div className="text-sm text-gray-700">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* AFTER Column */}
          <div>
            <Card className="border-2 border-green-200 bg-green-50 p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-green-600 rounded-full">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <h5 className="text-xl font-bold text-green-900">✅ Sesudah</h5>
              </div>
              
              <div className="space-y-4">
                {data.after.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg border border-green-200"
                  >
                    <div className="p-2 bg-green-100 rounded-lg text-green-600 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-bold text-green-900">{item.metric}</div>
                      <div className="text-sm text-gray-700">{item.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Impact Summary */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white inline-block">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8" />
              <div className="text-left">
                <div className="text-sm opacity-90">Total Impact:</div>
                <div className="text-3xl font-bold">{data.impact}</div>
              </div>
              <ArrowRight className="w-6 h-6 ml-2" />
            </div>
          </Card>
          
          <p className="text-sm text-gray-600 mt-4">
            💡 Angka di atas adalah estimate conservative. Actual results bisa lebih tinggi!
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}
