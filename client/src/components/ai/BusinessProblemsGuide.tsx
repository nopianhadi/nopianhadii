import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle,
  TrendingDown,
  Clock,
  Users,
  DollarSign,
  BarChart3,
  FileText,
  Package,
  MessageSquare,
  Zap,
  Database,
  ShoppingCart
} from "lucide-react";

interface BusinessProblem {
  category: string;
  icon: React.ReactNode;
  color: string;
  problems: {
    title: string;
    description: string;
    symptoms: string[];
    solution: string;
  }[];
}

const businessProblems: BusinessProblem[] = [
  {
    category: "Masalah Data & Laporan",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    problems: [
      {
        title: "Data Tersebar di Mana-mana",
        description: "Data penjualan di Excel, inventory di Google Sheets, customer di WhatsApp. Susah dapat gambaran lengkap bisnis.",
        symptoms: [
          "Butuh 2-3 jam untuk compile laporan",
          "Data sering tidak sinkron antar sistem",
          "Sulit ambil keputusan karena data tidak real-time",
          "Tim marketing tidak tahu update stock"
        ],
        solution: "Business Intelligence Dashboard - Semua data terpusat dalam satu dashboard real-time yang bisa diakses di mana saja"
      },
      {
        title: "Laporan Manual Memakan Waktu",
        description: "Setiap minggu/bulan harus manually compile data dari berbagai sumber untuk bikin laporan ke bos atau investor.",
        symptoms: [
          "Menghabiskan 1-2 hari untuk bikin laporan",
          "Sering ada error karena copy-paste manual",
          "Format tidak konsisten setiap periode",
          "Tidak ada automated insights"
        ],
        solution: "Automated Reporting System - Laporan ter-generate otomatis setiap hari/minggu/bulan, kirim ke email dalam format professional"
      }
    ]
  },
  {
    category: "Masalah Customer & Sales",
    icon: <Users className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    problems: [
      {
        title: "Kehilangan Track Customer",
        description: "Data customer ada di notes HP sales, WhatsApp chat, atau memory. Kalau sales resign, semua data hilang.",
        symptoms: [
          "Tidak tahu customer pernah beli apa saja",
          "Lupa follow-up leads potential",
          "Sales resign, customer data hilang",
          "Tidak ada history komunikasi"
        ],
        solution: "CRM System - Centralized customer database dengan complete history interactions, otomatis remind follow-up"
      },
      {
        title: "Conversion Rate Rendah",
        description: "Banyak leads masuk tapi yang jadi customer sedikit. Tidak tahu di tahap mana leads drop.",
        symptoms: [
          "Lead masuk 100, yang closing cuma 5-10",
          "Tidak tahu kenapa leads tidak jadi customer",
          "Sales tidak follow-up dengan konsisten",
          "Tidak ada data untuk optimize process"
        ],
        solution: "Sales Funnel Analytics - Track setiap tahap dari awareness sampai closing, tahu persis di mana bottleneck"
      },
      {
        title: "Customer Service Overwhelmed",
        description: "CS kebanjiran chat dengan pertanyaan yang sama berulang-ulang. Team capek dan response time lama.",
        symptoms: [
          "Response time 2-4 jam (customer complain)",
          "80% pertanyaan repetitif (harga, jam buka, dll)",
          "CS stress dan burnout",
          "Need hire CS baru tapi budget terbatas"
        ],
        solution: "AI Chatbot + Ticketing System - Chatbot jawab 80% pertanyaan umum otomatis 24/7, CS fokus handle yang complex"
      }
    ]
  },
  {
    category: "Masalah Operasional",
    icon: <Zap className="w-6 h-6" />,
    color: "from-orange-500 to-red-500",
    problems: [
      {
        title: "Banyak Proses Manual Repetitif",
        description: "Setiap hari melakukan task yang sama: copy data, kirim email, update spreadsheet. Membuang waktu produktif.",
        symptoms: [
          "2-3 jam per hari untuk task repetitif",
          "Copy-paste data antar sistem",
          "Manual send email reminder ke customer",
          "Update status order satu-satu"
        ],
        solution: "Process Automation - Automate semua task repetitif, hemat 10-15 jam per minggu untuk fokus ke strategi"
      },
      {
        title: "Inventory Chaos",
        description: "Stock sering kehabisan atau kelebihan. Tidak tahu persis ada stock berapa dan di mana lokasinya.",
        symptoms: [
          "Sering kehabisan stock produk laris",
          "Kelebihan stock produk slow-moving (modal nganggur)",
          "Tidak tahu stock di gudang mana",
          "Hitung stock manual setiap bulan (butuh 2-3 hari)"
        ],
        solution: "Smart Inventory System - Real-time stock tracking dengan barcode, automated reorder alert, forecast demand"
      },
      {
        title: "Proses Approval Lambat",
        description: "Request purchase order, expense claim, leave request harus tunggu approve manual. Proses lama dan bottleneck.",
        symptoms: [
          "Tunggu approval 3-5 hari kerja",
          "Request sering tertunda atau hilang",
          "Tidak ada audit trail siapa approve kapan",
          "Manager overwhelmed dengan approval requests"
        ],
        solution: "Workflow Automation System - Automated approval flow dengan multi-level, notifikasi real-time, audit trail lengkap"
      }
    ]
  },
  {
    category: "Masalah Keuangan",
    icon: <DollarSign className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    problems: [
      {
        title: "Cash Flow Tidak Jelas",
        description: "Tidak tahu uang masuk-keluar secara real-time. Sering kaget saldo tidak sesuai ekspektasi.",
        symptoms: [
          "Bingung uang habis untuk apa",
          "Sering minus di rekening",
          "Profit tampak besar tapi cash tipis",
          "Tidak ada forecast cash flow"
        ],
        solution: "Financial Management System - Track income-expense real-time, forecast cash flow, automated categorization"
      },
      {
        title: "Invoice & Payment Manual",
        description: "Bikin invoice manual di Word/Excel, kirim via email satu-satu, track payment secara manual di spreadsheet.",
        symptoms: [
          "30 menit untuk bikin satu invoice",
          "Lupa follow-up invoice yang belum bayar",
          "Tidak tahu aging piutang",
          "Reconcile payment memakan waktu 1-2 hari"
        ],
        solution: "Automated Invoicing System - Generate invoice otomatis, kirim via email, remind auto, track payment status real-time"
      },
      {
        title: "Expense Tidak Terkontrol",
        description: "Team claim expense dengan nota fisik, approval manual, reimbursement lama. Sulit control budget per department.",
        symptoms: [
          "Nota hilang, tidak bisa claim",
          "Approval expense butuh 1-2 minggu",
          "Tidak tahu budget department sudah habis atau belum",
          "Tidak ada visibility expense patterns"
        ],
        solution: "Expense Management System - Upload foto nota via HP, approval workflow otomatis, budget tracking per department"
      }
    ]
  },
  {
    category: "Masalah E-Commerce",
    icon: <ShoppingCart className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    problems: [
      {
        title: "Manage Multi-Channel Sales Ribet",
        description: "Jual di marketplace, website sendiri, Instagram. Stock, order, dan customer data tidak sinkron.",
        symptoms: [
          "Stock habis di Tokopedia tapi masih available di Shopee",
          "Order masuk dari 5 channel, pusing manage",
          "Harga tidak konsisten antar channel",
          "Customer beli di IG tapi tanya di WhatsApp"
        ],
        solution: "Omnichannel Management System - Centralized dashboard untuk manage semua channel, stock auto-sync, unified inbox"
      },
      {
        title: "Fulfillment Manual & Error-Prone",
        description: "Print resi manual, packing satu-satu tanpa sistem, sering salah kirim atau kelewatan.",
        symptoms: [
          "3-4 jam per hari untuk packing & shipping",
          "Sering salah alamat atau produk",
          "Customer complain late delivery",
          "Tidak ada tracking internal"
        ],
        solution: "Order Fulfillment System - Bulk print resi, barcode scanning, packing checklist, integrated tracking, automated notification"
      }
    ]
  },
  {
    category: "Masalah Komunikasi Internal",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "from-indigo-500 to-blue-500",
    problems: [
      {
        title: "Informasi Tidak Sampai ke Team",
        description: "Update penting di WhatsApp group tenggelam, team tidak baca email, informasi tidak terorganisir.",
        symptoms: [
          "Team bilang 'tidak tahu ada update'",
          "Informasi penting tenggelam di chat",
          "Harus repeat info berkali-kali",
          "Tidak ada single source of truth"
        ],
        solution: "Internal Communication Platform - Centralized announcements, read receipts, search history, organized by topic"
      },
      {
        title: "Collaboration Antar Department Sulit",
        description: "Marketing tidak tahu update dari Product, Sales tidak sync dengan CS, semua silo.",
        symptoms: [
          "Marketing promosi produk yang out of stock",
          "Sales promise fitur yang belum ada",
          "CS tidak tahu promo terbaru",
          "Project delay karena miscommunication"
        ],
        solution: "Collaborative Workspace - Shared dashboards, task management, real-time updates, cross-department visibility"
      }
    ]
  }
];

export default function BusinessProblemsGuide() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-3">
          Masalah Bisnis Apa yang Bisa Kami Selesaikan?
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Dari pengalaman menangani <strong>100+ klien</strong>, ini adalah masalah-masalah bisnis yang paling sering terjadi dan bisa diselesaikan dengan aplikasi web/sistem yang tepat
        </p>
      </div>

      {/* Problems List */}
      <div className="space-y-6">
        {businessProblems.map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIndex * 0.1 }}
          >
            <Card className="p-6 border-2">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                  {category.icon}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{category.category}</h4>
                  <p className="text-sm text-gray-600">{category.problems.length} masalah umum</p>
                </div>
              </div>

              {/* Problems */}
              <div className="space-y-6">
                {category.problems.map((problem, probIndex) => (
                  <div key={probIndex} className="space-y-3">
                    {/* Problem Title */}
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <h5 className="font-bold text-base mb-1">{problem.title}</h5>
                        <p className="text-sm text-gray-600 leading-relaxed">{problem.description}</p>
                      </div>
                    </div>

                    {/* Symptoms */}
                    <div className="ml-7 bg-red-50 rounded-lg p-4">
                      <p className="text-xs font-semibold text-red-700 mb-2">Gejala yang Anda Alami:</p>
                      <ul className="space-y-1.5">
                        {problem.symptoms.map((symptom, idx) => (
                          <li key={idx} className="text-sm text-red-800 flex items-start gap-2">
                            <TrendingDown className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Solution */}
                    <div className="ml-7 bg-green-50 rounded-lg p-4">
                      <p className="text-xs font-semibold text-green-700 mb-2">✅ Solusi:</p>
                      <p className="text-sm text-green-800 leading-relaxed">
                        <strong>{problem.solution.split(' - ')[0]}</strong> - {problem.solution.split(' - ')[1]}
                      </p>
                    </div>

                    {probIndex < category.problems.length - 1 && (
                      <div className="border-b border-gray-200 my-4" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="text-center space-y-3">
          <h4 className="font-bold text-xl">Tidak Menemukan Masalah Anda di List?</h4>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Setiap bisnis punya tantangan unik. Ceritakan masalah spesifik Anda di form di atas, dan AI kami akan recommend solusi yang paling tepat untuk kasus Anda.
          </p>
          <Badge className="bg-blue-600 text-white">
            Konsultasi Gratis • 100% Confidential
          </Badge>
        </div>
      </Card>
    </div>
  );
}
