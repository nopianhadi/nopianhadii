import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  TrendingUp, 
  Clock,
  CheckCircle,
  ArrowRight,
  Quote
} from "lucide-react";

interface CaseStudy {
  name: string;
  business: string;
  industry: string;
  location: string;
  avatar: string;
  problem: string;
  solution: string;
  results: {
    metric: string;
    value: string;
    description: string;
  }[];
  testimonial: string;
  rating: number;
  timeline: string;
}

const caseStudies: Record<string, CaseStudy[]> = {
  "Inventory Management": [
    {
      name: "Bu Sarah",
      business: "Toko Fashion Sarah",
      industry: "Fashion Retail",
      location: "Jakarta",
      avatar: "👩‍💼",
      problem: "Sering stockout untuk produk trending, sebaliknya overstock untuk produk slow-moving. 15% modal nganggur di deadstock.",
      solution: "Smart Inventory System dengan real-time tracking, barcode scanning, dan automated reorder alerts.",
      results: [
        { metric: "Revenue Growth", value: "+35%", description: "dalam 6 bulan" },
        { metric: "Stockout Days", value: "-70%", description: "dari 10 hari → 3 hari/bulan" },
        { metric: "Deadstock Reduction", value: "-60%", description: "dari 15% → 6% inventory value" },
        { metric: "Time Saved", value: "2.5 jam/hari", description: "untuk inventory management" }
      ],
      testimonial: "Sebelum pakai Smart Inventory System, saya sering kehabisan stock untuk produk yang lagi trending. Customer complain, sales hilang. Sekarang dengan auto-reorder alerts, saya nggak pernah stockout lagi. Revenue naik 35% dalam 6 bulan!",
      rating: 5,
      timeline: "6 minggu implementation"
    },
    {
      name: "Pak Budi",
      business: "Toko Bangunan Maju Jaya",
      industry: "Building Materials",
      location: "Bandung",
      avatar: "👨‍💼",
      problem: "Manage 3 gudang + 2 toko dengan Excel. Data sering tidak sinkron, stocktake butuh 2 hari.",
      solution: "Multi-location inventory system dengan barcode scanning dan centralized dashboard.",
      results: [
        { metric: "Stocktake Time", value: "-85%", description: "dari 2 hari → 3 jam" },
        { metric: "Stock Accuracy", value: "99.5%", description: "vs 85% sebelumnya" },
        { metric: "Transfer Efficiency", value: "+60%", description: "antar lokasi lebih cepat" },
        { metric: "ROI", value: "420%", description: "dalam 12 bulan" }
      ],
      testimonial: "Dulu stocktake di 5 lokasi butuh 2 hari penuh dan hasilnya sering salah. Sekarang dengan barcode scanner, 3 jam kelar dan akurat 99.5%! Investasi 40 juta, saving-nya 15 juta per bulan. Best decision ever!",
      rating: 5,
      timeline: "8 minggu implementation"
    }
  ],
  "CRM System": [
    {
      name: "Ibu Linda",
      business: "Linda Insurance Agency",
      industry: "Insurance",
      location: "Surabaya",
      avatar: "👩‍💼",
      problem: "40% leads hilang karena lupa follow-up. Data customer tersebar di notes HP 3 sales agents. Kalau sales resign, data ikut hilang.",
      solution: "CRM System dengan automated follow-up reminders, WhatsApp integration, dan centralized customer database.",
      results: [
        { metric: "Conversion Rate", value: "+150%", description: "dari 12% → 30%" },
        { metric: "Lead Recovery", value: "90%", description: "vs 60% sebelumnya" },
        { metric: "Sales Cycle", value: "-40%", description: "dari 15 hari → 9 hari" },
        { metric: "Revenue Growth", value: "+65%", description: "dalam 8 bulan" }
      ],
      testimonial: "CRM ini game-changer untuk bisnis asuransi saya! Sebelumnya 40% leads hilang karena lupa follow-up. Sekarang sistem auto-remind, conversion rate naik dari 12% ke 30%. Revenue naik 65% tanpa tambah sales!",
      rating: 5,
      timeline: "5 minggu implementation"
    }
  ],
  "Dashboard Analytics": [
    {
      name: "Pak Andi",
      business: "PT Sentosa Distribusi",
      industry: "Distribution",
      location: "Semarang",
      avatar: "👨‍💼",
      problem: "Compile laporan dari 5 sistem butuh 2 hari. Keputusan bisnis sering terlambat karena tunggu data.",
      solution: "Real-time analytics dashboard dengan automated data integration dari semua systems.",
      results: [
        { metric: "Reporting Time", value: "-95%", description: "dari 2 hari → 1 jam" },
        { metric: "Decision Speed", value: "+80%", description: "real-time vs weekly" },
        { metric: "Data Accuracy", value: "100%", description: "single source of truth" },
        { metric: "Profit Margin", value: "+8%", description: "dari better decisions" }
      ],
      testimonial: "Dashboard ini bikin keputusan bisnis jadi jauh lebih cepat dan akurat. Dulu tunggu laporan 2 hari, sekarang real-time di HP! Profit margin naik 8% karena bisa respond cepat ke market changes.",
      rating: 5,
      timeline: "7 minggu implementation"
    }
  ]
};

interface CaseStudiesProps {
  solutionType: string;
}

export default function CaseStudies({ solutionType }: CaseStudiesProps) {
  const studies = caseStudies[solutionType] || caseStudies["Inventory Management"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-8"
    >
      <div className="text-center mb-6">
        <Badge className="mb-3 bg-yellow-600">
          <Star className="w-3 h-3 mr-1" />
          Real Success Stories
        </Badge>
        <h3 className="text-2xl font-bold mb-2">Kisah Sukses Klien Kami</h3>
        <p className="text-gray-600">
          Lihat hasil nyata yang dicapai oleh bisnis seperti Anda
        </p>
      </div>

      <div className="space-y-6">
        {studies.map((study, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="p-6 border-2 hover:shadow-xl transition-shadow">
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{study.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-lg">{study.name}</h4>
                      <p className="text-sm text-gray-600">{study.business}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {study.industry}
                        </Badge>
                        <span className="text-xs text-gray-500">📍 {study.location}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(study.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Problem → Solution */}
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Card className="p-4 bg-red-50 border-red-200">
                  <h5 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                    <span className="text-lg">❌</span>
                    Masalah Sebelumnya:
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed">{study.problem}</p>
                </Card>
                <Card className="p-4 bg-green-50 border-green-200">
                  <h5 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <span className="text-lg">✅</span>
                    Solusi yang Digunakan:
                  </h5>
                  <p className="text-sm text-gray-700 leading-relaxed">{study.solution}</p>
                </Card>
              </div>

              {/* Results Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {study.results.map((result, idx) => (
                  <Card key={idx} className="p-3 text-center border-2">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {result.value}
                    </div>
                    <div className="text-xs font-semibold text-gray-700 mb-1">
                      {result.metric}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.description}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Testimonial Quote */}
              <Card className="p-4 bg-blue-50 border-blue-200 relative">
                <Quote className="absolute top-2 left-2 w-6 h-6 text-blue-300" />
                <blockquote className="italic text-gray-700 leading-relaxed pl-8">
                  "{study.testimonial}"
                </blockquote>
                <div className="mt-3 pt-3 border-t border-blue-200 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{study.timeline}</span>
                  </div>
                  <Badge className="bg-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified Client
                  </Badge>
                </div>
              </Card>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center mt-6">
        <h4 className="font-bold text-xl mb-2">
          Siap Jadi Success Story Berikutnya?
        </h4>
        <p className="mb-4 opacity-90">
          Join 100+ klien yang sudah transform bisnis mereka dengan solusi kami
        </p>
        <Button 
          size="lg"
          className="bg-white text-blue-600 hover:bg-gray-100"
          asChild
        >
          <a 
            href="https://wa.me/62895406181407?text=Halo, saya tertarik untuk mendapatkan hasil seperti success stories yang saya baca. Bisa diskusi?"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mulai Transformation Anda
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </Button>
      </Card>
    </motion.div>
  );
}
