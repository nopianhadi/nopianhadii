import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { 
  Sparkles, Send, CheckCircle2, TrendingUp, Users, 
  BarChart3, Zap, MessageSquare, Lightbulb, 
  Target, DollarSign, HelpCircle, 
  Loader2, Search, BarChart2, Package2
} from "lucide-react";

// Types
interface Solution {
  type: string;
  problemAnalysis: string;
  problemDetails: string;
  title: string;
  description: string;
  detailedSolution: string;
  webAppRecommendation: {
    type: 'website' | 'mobile-app' | 'web-app';
    name: string;
    features: string[];
    techStack: string[];
  };
  icon: React.ReactNode;
  benefits: string[];
  timeline: string;
}



const AIBusinessSolver = () => {
  // State
  const [problem, setProblem] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showProblemsGuide, setShowProblemsGuide] = useState(false);
  
  // Example problems for the guide
  const exampleProblems = [
    "Saya kesulitan mengelola stok dan sering kehabisan barang di toko online saya",
    "Saya butuh sistem untuk mengelola data pelanggan dengan lebih baik",
    "Saya ingin membuat laporan keuangan yang lebih baik dan akurat",
    "Saya ingin mengotomatisasi proses penjualan dan pembelian"
  ];

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    analyzeProblem();
  };

  // Handle example problem click
  const handleExampleClick = (example: string) => {
    setProblem(example);
    setShowProblemsGuide(false);
  };

  // AI Problem Analysis & Solution Recommendation
  const analyzeProblem = useCallback(() => {
    if (!problem.trim()) return;

    setIsAnalyzing(true);
    setShowResults(false);

    // Simulate AI processing
    setTimeout(() => {
      const problemLower = problem.toLowerCase();
      const recommendedSolutions: Solution[] = [];

      // Detailed keyword-based solution matching
      if (problemLower.includes('stok') || problemLower.includes('inventory') || problemLower.includes('barang')) {
        recommendedSolutions.push({
          type: "inventory",
          problemAnalysis: "Masalah Manajemen Stok",
          problemDetails: "Kesulitan dalam mengelola stok barang dapat menyebabkan kerugian besar seperti kehilangan penjualan karena stockout, atau kerugian modal karena overstock. Tanpa sistem yang tepat, bisnis sulit untuk mengetahui kapan harus reorder, berapa jumlah optimal, dan bagaimana mengoptimalkan cash flow.",
          title: "Sistem Manajemen Inventori Web-Based",
          description: 'Platform web terintegrasi untuk mengelola seluruh aspek inventory dengan real-time monitoring',
          detailedSolution: "Kami akan membangun sistem inventory management berbasis web yang dapat diakses dari mana saja. Sistem ini akan mencatat setiap transaksi masuk/keluar barang, memberikan alert otomatis saat stok menipis, dan menyediakan dashboard analytics untuk membantu pengambilan keputusan. Fitur barcode scanning akan mempermudah input data dan mengurangi human error.",
          webAppRecommendation: {
            type: 'web-app',
            name: 'Smart Inventory Management System',
            features: [
              'Dashboard real-time dengan grafik stok per kategori',
              'Sistem alert otomatis via email/WhatsApp saat stok minimum',
              'Barcode scanner terintegrasi untuk input cepat',
              'Laporan inventory aging dan turnover analysis',
              'Multi-location inventory tracking',
              'Purchase order automation ke supplier'
            ],
            techStack: ['React.js', 'Node.js', 'PostgreSQL', 'PWA', 'Barcode API']
          },
          icon: <Package2 className="w-6 h-6" />,
          benefits: [
            'Mengurangi stockout hingga 90%',
            'Optimasi cash flow dengan inventory yang tepat',
            'Hemat waktu 5+ jam per hari untuk stock checking manual'
          ],
          timeline: '3-4 minggu'
        });
      }

      if (problemLower.includes('pelanggan') || problemLower.includes('customer') || problemLower.includes('crm')) {
        recommendedSolutions.push({
          type: "crm",
          problemAnalysis: "Masalah Manajemen Pelanggan",
          problemDetails: "Tanpa sistem CRM yang baik, bisnis kehilangan track terhadap interaksi pelanggan, sulit melakukan follow-up yang tepat waktu, dan tidak dapat menganalisis perilaku pelanggan untuk meningkatkan retention. Data pelanggan yang tersebar di berbagai tempat membuat tim sales tidak efektif.",
          title: "Customer Relationship Management (CRM) System",
          description: 'Platform CRM komprehensif untuk mengelola seluruh customer journey',
          detailedSolution: "Kami akan mengembangkan sistem CRM yang mencatat seluruh interaksi dengan pelanggan, mulai dari lead pertama hingga after-sales service. Sistem ini akan memiliki pipeline management untuk tracking deals, automated follow-up reminders, dan customer analytics untuk memahami perilaku pembelian. Integration dengan WhatsApp dan email marketing akan memudahkan komunikasi.",
          webAppRecommendation: {
            type: 'web-app',
            name: 'Comprehensive CRM Platform',
            features: [
              'Customer database dengan history lengkap interaksi',
              'Sales pipeline dengan drag-drop deal management',
              'Automated email sequences dan follow-up reminders',
              'WhatsApp integration untuk komunikasi langsung',
              'Customer segmentation dan behavior analysis',
              'Sales performance dashboard dan reporting'
            ],
            techStack: ['React.js', 'Node.js', 'MongoDB', 'WhatsApp API', 'Email API']
          },
          icon: <Users className="w-6 h-6" />,
          benefits: [
            'Meningkatkan customer retention hingga 40%',
            'Mempercepat sales cycle dengan follow-up otomatis',
            'Insight mendalam tentang customer behavior'
          ],
          timeline: '4-6 minggu'
        });
      }

      if (problemLower.includes('penjualan') || problemLower.includes('sales') || problemLower.includes('omzet')) {
        recommendedSolutions.push({
          type: "sales",
          problemAnalysis: "Masalah Sistem Penjualan",
          problemDetails: "Proses penjualan yang masih manual atau tidak terintegrasi menyebabkan inefficiency, kesulitan tracking performa sales, dan hilangnya peluang revenue. Tanpa data yang akurat, sulit untuk membuat forecasting dan strategi penjualan yang tepat.",
          title: "Sales Management & E-Commerce Platform",
          description: 'Platform penjualan terintegrasi dengan e-commerce dan sales tracking',
          detailedSolution: "Kami akan membangun platform penjualan yang mengintegrasikan online store dengan sistem manajemen sales internal. Platform ini akan memiliki fitur katalog produk, shopping cart, payment gateway, dan admin dashboard untuk monitoring penjualan. Sales team dapat tracking leads, deals, dan performance melalui dashboard yang user-friendly.",
          webAppRecommendation: {
            type: 'web-app',
            name: 'Integrated Sales & E-Commerce Platform',
            features: [
              'E-commerce website dengan katalog produk lengkap',
              'Multiple payment gateway (Midtrans, Xendit, dll)',
              'Sales dashboard dengan real-time analytics',
              'Lead management dan conversion tracking',
              'Inventory integration untuk update stok otomatis',
              'Customer portal untuk order history dan tracking'
            ],
            techStack: ['Next.js', 'Stripe/Midtrans', 'PostgreSQL', 'Redis', 'PWA']
          },
          icon: <TrendingUp className="w-6 h-6" />,
          benefits: [
            'Meningkatkan penjualan online hingga 200%',
            'Otomatisasi proses order hingga fulfillment',
            'Data-driven insights untuk strategi penjualan'
          ],
          timeline: '5-8 minggu'
        });
      }

      if (problemLower.includes('laporan') || problemLower.includes('data') || problemLower.includes('analisis')) {
        recommendedSolutions.push({
          type: "analytics",
          problemAnalysis: "Masalah Reporting & Analytics",
          problemDetails: "Tanpa sistem reporting yang baik, bisnis sulit untuk mengambil keputusan berdasarkan data. Laporan manual memakan waktu lama dan sering tidak akurat. Kurangnya visibility terhadap key metrics membuat bisnis reaktif instead of proaktif dalam menghadapi masalah.",
          title: "Business Intelligence Dashboard",
          description: 'Dashboard analytics komprehensif untuk monitoring semua aspek bisnis',
          detailedSolution: "Kami akan mengembangkan dashboard business intelligence yang mengintegrasikan data dari berbagai sumber (penjualan, inventory, keuangan, marketing) menjadi satu tampilan yang mudah dipahami. Dashboard ini akan memiliki real-time charts, automated reports, dan alert system untuk metrics yang penting. Mobile-responsive design memungkinkan monitoring dari mana saja.",
          webAppRecommendation: {
            type: 'web-app',
            name: 'Business Intelligence Dashboard',
            features: [
              'Real-time dashboard dengan key business metrics',
              'Customizable charts dan visualisasi data',
              'Automated daily/weekly/monthly reports',
              'Data integration dari multiple sources',
              'Mobile-responsive untuk monitoring on-the-go',
              'Export reports ke PDF/Excel dengan scheduling'
            ],
            techStack: ['React.js', 'D3.js/Chart.js', 'Node.js', 'PostgreSQL', 'PWA']
          },
          icon: <BarChart3 className="w-6 h-6" />,
          benefits: [
            'Pengambilan keputusan 10x lebih cepat dengan data real-time',
            'Hemat 15+ jam per minggu untuk pembuatan laporan manual',
            'Early warning system untuk masalah bisnis'
          ],
          timeline: '3-5 minggu'
        });
      }

      // Default solution if no keywords match
      if (recommendedSolutions.length === 0) {
        recommendedSolutions.push({
          type: "custom",
          problemAnalysis: "Kebutuhan Solusi Custom",
          problemDetails: "Setiap bisnis memiliki keunikan dan tantangan spesifik yang tidak bisa diselesaikan dengan solusi generic. Dibutuhkan analisis mendalam untuk memahami workflow, pain points, dan requirements yang tepat untuk mengembangkan solusi yang benar-benar efektif.",
          title: "Custom Business Application",
          description: 'Aplikasi custom yang dirancang khusus sesuai kebutuhan bisnis Anda',
          detailedSolution: "Kami akan melakukan business analysis mendalam untuk memahami workflow dan kebutuhan spesifik Anda. Berdasarkan hasil analisis, kami akan merancang dan mengembangkan aplikasi custom yang mengatasi pain points utama bisnis Anda. Aplikasi akan dibangun dengan teknologi modern dan scalable architecture.",
          webAppRecommendation: {
            type: 'web-app',
            name: 'Custom Business Solution',
            features: [
              'Disesuaikan 100% dengan business process Anda',
              'User interface yang intuitif dan mudah digunakan',
              'Integration dengan sistem existing',
              'Scalable architecture untuk pertumbuhan bisnis',
              'Mobile-responsive atau dedicated mobile app',
              'Comprehensive admin panel dan reporting'
            ],
            techStack: ['React.js/Next.js', 'Node.js', 'PostgreSQL/MongoDB', 'Cloud Hosting', 'API Integration']
          },
          icon: <Lightbulb className="w-6 h-6" />,
          benefits: [
            'Solusi yang perfectly fit dengan kebutuhan bisnis',
            'Competitive advantage dengan sistem unique',
            'ROI maksimal karena mengatasi masalah spesifik'
          ],
          timeline: '8-12 minggu'
        });
      }

      setSolutions(recommendedSolutions.slice(0, 2)); // Limit to 2 solutions max
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1500);
  }, [problem]);

  return (
    <div className="py-16 px-4 md:px-6 max-w-5xl mx-auto bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 rounded-3xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg">
          <Sparkles className="w-4 h-4" />
          AI Business Consultant
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
          Ceritakan Masalah Bisnis Anda
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Dapatkan analisis mendalam dan rekomendasi solusi digital yang tepat untuk mengembangkan bisnis Anda
        </p>
      </div>

      {/* Problem Input Section */}
      <div className="max-w-3xl mx-auto mb-12">
        <form onSubmit={handleSubmit}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl">
              <Textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Contoh: Saya kesulitan mengelola stok dan sering kehabisan barang di toko online saya..."
                className="min-h-[140px] text-base pr-28 resize-none border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-gray-400"
                disabled={isAnalyzing}
                maxLength={500}
              />
              <Button
                type="submit"
                className="absolute right-4 bottom-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                disabled={!problem.trim() || isAnalyzing}
                size="sm"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Analisis AI
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowProblemsGuide(!showProblemsGuide)}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Lihat contoh masalah
            </button>
            
            <div className={cn(
              "text-sm px-3 py-1 rounded-full",
              problem.length > 400 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"
            )}>
              {problem.length}/500 karakter
            </div>
          </div>
        </form>
        
        {/* Example Problems */}
        {showProblemsGuide && (
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-600 mb-3 font-medium">💡 Klik untuk menggunakan contoh masalah:</p>
            <div className="grid gap-3">
              {exampleProblems.map((example, index) => (
                <div
                  key={index}
                  className="cursor-pointer text-left p-4 bg-gradient-to-r from-white to-blue-50/50 hover:from-blue-50 hover:to-purple-50 rounded-xl border border-blue-100 hover:border-blue-300 transition-all duration-200 hover:shadow-md hover:scale-[1.02] group"
                  onClick={() => handleExampleClick(example)}
                >
                  <div className="flex items-start">
                    <div className="p-1.5 bg-yellow-100 rounded-lg mr-3 group-hover:bg-yellow-200 transition-colors">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-sm text-gray-700 leading-relaxed group-hover:text-gray-800">{example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
              <CheckCircle2 className="w-4 h-4" />
              Analisis Selesai
            </div>
            <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Rekomendasi Solusi Digital
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berdasarkan analisis AI mendalam terhadap masalah bisnis Anda
            </p>
          </div>
          
          <div className="space-y-12">
            {solutions.map((solution, index) => (
              <div key={solution.type} className="relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-cyan-50 rounded-3xl opacity-50"></div>
                
                <Card className="relative p-8 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
                  <div className="space-y-8">
                    {/* Problem Analysis */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="relative">
                        <h4 className="text-xl font-bold mb-3 flex items-center">
                          <div className="p-2 bg-white/20 rounded-lg mr-3">
                            📋
                          </div>
                          {solution.problemAnalysis}
                        </h4>
                        <p className="text-red-100 leading-relaxed">
                          {solution.problemDetails}
                        </p>
                      </div>
                    </div>

                    {/* Solution Overview */}
                    <div className="flex items-start gap-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
                        {solution.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-gray-900 mb-3">{solution.title}</h4>
                        <p className="text-gray-600 text-lg leading-relaxed">{solution.description}</p>
                      </div>
                    </div>

                    {/* Detailed Solution */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                      <div className="relative">
                        <h5 className="text-lg font-bold mb-3 flex items-center">
                          <div className="p-2 bg-white/20 rounded-lg mr-3">
                            💡
                          </div>
                          Detail Solusi
                        </h5>
                        <p className="text-blue-100 leading-relaxed">
                          {solution.detailedSolution}
                        </p>
                      </div>
                    </div>

                    {/* Web/App Recommendation */}
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-14 translate-x-14"></div>
                      <div className="relative">
                        <h5 className="text-lg font-bold mb-3 flex items-center">
                          <div className="p-2 bg-white/20 rounded-lg mr-3">
                            🚀
                          </div>
                          Rekomendasi {solution.webAppRecommendation.type === 'website' ? 'Website' : 
                                     solution.webAppRecommendation.type === 'mobile-app' ? 'Mobile App' : 'Web Application'}
                        </h5>
                        <h6 className="text-xl font-semibold mb-4 text-emerald-100">{solution.webAppRecommendation.name}</h6>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="font-semibold mb-3 text-emerald-100">✨ Fitur Utama:</p>
                            <div className="grid gap-2">
                              {solution.webAppRecommendation.features.map((feature, i) => (
                                <div key={i} className="flex items-start">
                                  <CheckCircle2 className="w-5 h-5 text-emerald-200 mr-3 mt-0.5 flex-shrink-0" />
                                  <span className="text-emerald-100">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="font-semibold mb-3 text-emerald-100">🛠️ Teknologi yang Digunakan:</p>
                            <div className="flex flex-wrap gap-2">
                              {solution.webAppRecommendation.techStack.map((tech, i) => (
                                <Badge key={i} className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                      <h5 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                        <div className="p-2 bg-yellow-200 rounded-lg mr-3">
                          <TrendingUp className="w-5 h-5 text-yellow-700" />
                        </div>
                        Manfaat Bisnis
                      </h5>
                      <div className="grid gap-3">
                        {solution.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-start bg-white/60 rounded-lg p-3">
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-800 font-medium">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Timeline */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center bg-white/80 rounded-full px-6 py-3 shadow-lg">
                          <div className="p-2 bg-purple-200 rounded-lg mr-3">
                            ⏱️
                          </div>
                          <span className="font-semibold text-gray-700">Estimasi Waktu Pengerjaan:</span>
                          <span className="ml-3 font-bold text-purple-600 text-lg">{solution.timeline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          {/* Enhanced CTA */}
          <div className="relative mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium mb-4 shadow-lg">
                <CheckCircle2 className="w-4 h-4" />
                Siap Implementasi
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">
                Tertarik dengan Solusi Ini?
              </h4>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Mari diskusikan lebih detail tentang kebutuhan bisnis Anda dan bagaimana kami dapat membantu mewujudkan solusi digital yang tepat
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  <a href="/contact" className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Konsultasi Gratis
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                  <a href="/gallery" className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Lihat Portfolio
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Try Again */}
          <div className="text-center mt-8">
            <Button
              variant="ghost"
              onClick={() => {
                setShowResults(false);
                setProblem("");
                setSolutions([]);
              }}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 px-6 py-3 rounded-full transition-all duration-200"
            >
              🔄 Analisis Masalah Lain
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBusinessSolver;
