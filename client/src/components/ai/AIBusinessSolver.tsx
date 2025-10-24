import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolutionWorkflow from "@/components/ai/SolutionWorkflow";
import BusinessProblemsGuide from "@/components/ai/BusinessProblemsGuide";
import SolutionFAQ from "@/components/ai/SolutionFAQ";
import EnhancedCTA from "@/components/ai/EnhancedCTA";
import BeforeAfterComparison from "@/components/ai/BeforeAfterComparison";
import CaseStudies from "@/components/ai/CaseStudies";
import { 
  Sparkles, Brain, Send, CheckCircle2, TrendingUp, Users, 
  BarChart3, Zap, MessageSquare, ArrowRight, Lightbulb, 
  Target, DollarSign, ChevronDown, ChevronUp, HelpCircle, 
  Loader2, Search, BarChart2, PieChart, Clock, AlertCircle, Package2, FileText
} from "lucide-react";

// Types
type Complexity = 'Low' | 'Medium' | 'High';

interface Solution {
  type: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  estimatedROI: string;
  timeline: string;
  complexity: Complexity;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1]
    } 
  },
};

// Utility functions
const getComplexityBadge = (complexity: Complexity) => {
  const styles = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };
  
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full ${styles[complexity]}`}>
      {complexity} Complexity
    </span>
  );
};

const getTimelineBadge = (timeline: string) => (
  <div className="flex items-center text-sm text-gray-600">
    <Clock className="w-4 h-4 mr-1" />
    <span>{timeline}</span>
  </div>
);

const getROIBadge = (roi: string) => (
  <div className="flex items-center text-sm font-medium text-green-600">
    <TrendingUp className="w-4 h-4 mr-1" />
    <span>ROI: {roi}</span>
  </div>
);

const AIBusinessSolver = () => {
  // State
  const [problem, setProblem] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null);
  const [showProblemsGuide, setShowProblemsGuide] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'solutions' | 'workflow' | 'case-studies'>('solutions');
  
  // Example problems for the guide
  const exampleProblems = [
    "Saya kesulitan mengelola stok dan sering kehabisan barang di toko online saya",
    "Saya butuh sistem untuk mengelola data pelanggan dengan lebih baik",
    "Saya ingin membuat laporan keuangan yang lebih baik dan akurat",
    "Saya ingin mengotomatisasi proses penjualan dan pembelian"
  ];

  // Toggle workflow expansion
  const toggleWorkflow = useCallback((solutionType: string) => {
    setExpandedWorkflow(prev => prev === solutionType ? null : solutionType);
  }, []);

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
    setIsSubmitting(true);
    setShowResults(false);
    setActiveTab('solutions');

    // Simulate AI processing with a more realistic delay
    setTimeout(() => {
      const problemLower = problem.toLowerCase();
      const recommendedSolutions: Solution[] = [];

      // Sample solution based on problem keywords
      if (problemLower.includes('stok') || problemLower.includes('inventory')) {
        recommendedSolutions.push({
          type: "inventory",
          title: "Sistem Manajemen Inventori Otomatis",
          description: 'Solusi terintegrasi untuk mengelola stok, pemesanan, dan prediksi kebutuhan inventori',
          icon: <Package2 className="w-6 h-6" />,
          benefits: [
            'Prediksi stok akurat hingga 95%',
            'Notifikasi stok menipis otomatis',
            'Integrasi dengan sistem POS dan e-commerce',
            'Laporan analisis tren penjualan'
          ],
          estimatedROI: '30-50% dalam 6 bulan',
          timeline: 'Implementasi 2-4 minggu',
          complexity: 'Medium'
        });
      }

      if (problemLower.includes('pelanggan') || problemLower.includes('customer')) {
        recommendedSolutions.push({
          type: "crm",
          title: "Sistem Manajemen Hubungan Pelanggan (CRM)",
          description: 'Kelola interaksi dengan pelanggan dan tingkatkan retensi pelanggan',
          icon: <Users className="w-6 h-6" />,
          benefits: [
            'Database pelanggan terpusat',
            'Pelacakan interaksi pelanggan',
            'Analisis perilaku pelanggan',
            'Otomatisasi pemasaran'
          ],
          estimatedROI: '40-60% dalam 6 bulan',
          timeline: 'Implementasi 3-5 minggu',
          complexity: 'Medium'
        });
      }

      // Add more solution types based on problem keywords
      if (recommendedSolutions.length === 0) {
        recommendedSolutions.push({
          type: "analytics",
          title: "Dashboard Analitik Bisnis",
          description: 'Visualisasi data real-time untuk pengambilan keputusan yang lebih baik',
          icon: <BarChart2 className="w-6 h-6" />,
          benefits: [
            'Laporan penjualan real-time',
            'Analisis tren dan prediksi',
            'Custom dashboard sesuai kebutuhan',
            'Akses dari perangkat apapun'
          ],
          estimatedROI: '20-40% peningkatan efisiensi',
          timeline: 'Implementasi 1-2 minggu',
          complexity: 'Low'
        });
      }

      // Data Management Problems
      if (problemLower.includes('data') || problemLower.includes('laporan') || problemLower.includes('informasi') || problemLower.includes('tracking')) {
        recommendedSolutions.push({
          type: "Dashboard Analytics",
          title: "Business Intelligence Dashboard",
          description: "Real-time dashboard untuk monitoring data bisnis, analytics, dan reporting otomatis",
          icon: <BarChart3 className="w-6 h-6" />,
          benefits: [
            "Real-time data visualization",
            "Automated reporting",
            "Custom KPI tracking",
            "Multi-source data integration",
            "Mobile-friendly access"
          ],
          estimatedROI: "300-500% dalam 12 bulan",
          timeline: "6-10 minggu",
          complexity: "Medium"
        });
      }

      // Customer Management Problems
      if (problemLower.includes('customer') || problemLower.includes('pelanggan') || problemLower.includes('client') || problemLower.includes('klien') || problemLower.includes('crm')) {
        recommendedSolutions.push({
          type: "CRM System",
          title: "Customer Relationship Management",
          description: "Kelola hubungan pelanggan, track interactions, dan tingkatkan customer satisfaction",
          icon: <Users className="w-6 h-6" />,
          benefits: [
            "Centralized customer database",
            "Interaction history tracking",
            "Automated follow-ups",
            "Sales pipeline management",
            "Customer analytics"
          ],
          estimatedROI: "250-400% dalam 12 bulan",
          timeline: "8-12 minggu",
          complexity: "Medium"
        });
      }

      // Sales & Revenue Problems
      if (problemLower.includes('sales') || problemLower.includes('penjualan') || problemLower.includes('revenue') || problemLower.includes('omzet') || problemLower.includes('pendapatan')) {
        recommendedSolutions.push({
          type: "Sales Management",
          title: "Sales Automation Platform",
          description: "Automate sales process, track leads, dan optimize conversion funnel",
          icon: <TrendingUp className="w-6 h-6" />,
          benefits: [
            "Lead scoring & prioritization",
            "Automated email sequences",
            "Sales performance analytics",
            "Deal pipeline visualization",
            "Revenue forecasting"
          ],
          estimatedROI: "400-600% dalam 12 bulan",
          timeline: "6-8 minggu",
          complexity: "Medium"
        });
      }

      // Communication Problems
      if (problemLower.includes('komunikasi') || problemLower.includes('chat') || problemLower.includes('support') || problemLower.includes('customer service')) {
        recommendedSolutions.push({
          type: "Customer Support",
          title: "AI-Powered Support System",
          description: "Chatbot AI dan ticketing system untuk handle customer inquiries 24/7",
          icon: <MessageSquare className="w-6 h-6" />,
          benefits: [
            "24/7 AI chatbot support",
            "Ticket management system",
            "Multi-channel integration",
            "Response time analytics",
            "Customer satisfaction tracking"
          ],
          estimatedROI: "200-350% dalam 12 bulan",
          timeline: "4-6 minggu",
          complexity: "Low"
        });
      }

      // Process Automation Problems
      if (problemLower.includes('manual') || problemLower.includes('otomatis') || problemLower.includes('repetitif') || problemLower.includes('efisien') || problemLower.includes('workflow')) {
        recommendedSolutions.push({
          type: "Process Automation",
          title: "Business Process Automation",
          description: "Automate repetitive tasks dan streamline workflows untuk efisiensi maksimal",
          icon: <Zap className="w-6 h-6" />,
          benefits: [
            "Workflow automation",
            "Task scheduling",
            "Document processing",
            "Email automation",
            "Integration dengan existing tools"
          ],
          estimatedROI: "500-800% dalam 12 bulan",
          timeline: "3-5 minggu",
          complexity: "Low"
        });
      }

      // Inventory/Stock Problems
      if (problemLower.includes('inventory') || problemLower.includes('stock') || problemLower.includes('stok') || problemLower.includes('gudang') || problemLower.includes('barang')) {
        recommendedSolutions.push({
          type: "Inventory Management",
          title: "Sistem Inventory Pintar (Smart Inventory System)",
          description: "Solusi lengkap untuk mengelola stok barang secara real-time, otomatis reorder saat stock menipis, dan optimasi level inventory supaya tidak overstock atau kehabisan barang. Sistem ini akan integrasikan semua gudang/toko Anda dalam satu dashboard terpusat dengan barcode scanning untuk input cepat dan akurat.",
          icon: <Target className="w-6 h-6" />,
          benefits: [
            "Real-time Stock Tracking - Lihat stock di semua lokasi (gudang, toko, cabang) secara real-time di dashboard. Setiap transaksi (masuk/keluar/transfer) langsung ter-update otomatis",
            "Automated Reorder Alerts - Sistem akan otomatis kirim alert (email/WhatsApp) saat stock mencapai minimum level. Bahkan bisa auto-generate Purchase Order ke supplier",
            "Multi-location Management - Kelola inventory di berbagai lokasi sekaligus. Transfer stock antar lokasi, lihat stock per lokasi atau total, semua dari satu dashboard",
            "Barcode/QR Scanning - Input stock cukup scan barcode pakai HP. Cepat, akurat, dan minimize human error. Label barcode bisa print sendiri dari sistem",
            "Stock Analytics & Forecasting - Dashboard analytics untuk monitor turnover rate, aging stock, dan forecast demand 1-3 bulan ke depan based on historical data"
          ],
          estimatedROI: "300-500% dalam 12 bulan (hemat dari tidak overstock + tidak kehilangan sales karena stockout)",
          timeline: "6-10 minggu (tergantung jumlah SKU dan kompleksitas integrasi)",
          complexity: "Medium"
        });
      }

      // Financial Problems
      if (problemLower.includes('keuangan') || problemLower.includes('finance') || problemLower.includes('accounting') || problemLower.includes('invoice') || problemLower.includes('payment')) {
        recommendedSolutions.push({
          type: "Financial Management",
          title: "Accounting & Finance System",
          description: "Kelola keuangan, invoicing, dan financial reporting dengan mudah",
          icon: <DollarSign className="w-6 h-6" />,
          benefits: [
            "Automated invoicing",
            "Expense tracking",
            "Financial reports",
            "Payment gateway integration",
            "Tax calculation"
          ],
          estimatedROI: "250-400% dalam 12 bulan",
          timeline: "8-12 minggu",
          complexity: "High"
        });
      }

      // Default: Custom Solution
      if (recommendedSolutions.length === 0) {
        recommendedSolutions.push({
          type: "Custom Solution",
          title: "Custom Business Application",
          description: "Solusi aplikasi custom yang disesuaikan dengan kebutuhan spesifik bisnis Anda",
          icon: <Lightbulb className="w-6 h-6" />,
          benefits: [
            "Fully customized to your needs",
            "Scalable architecture",
            "Integration ready",
            "Modern tech stack",
            "Ongoing support & maintenance"
          ],
          estimatedROI: "300-600% dalam 12 bulan",
          timeline: "8-16 minggu",
          complexity: "Medium"
        });
      }

      setSolutions(recommendedSolutions);
      setIsAnalyzing(false);
      setShowResults(true);
      setIsSubmitting(false);
      
      // Scroll to results
      setTimeout(() => {
        const resultsElement = document.getElementById('solutions-section');
        if (resultsElement) {
          resultsElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }, 2000);
  }, [problem]);

  return (
    <div className="py-12 px-4 md:px-6 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16"
      >
        <Badge 
          variant="outline" 
          className="mb-4 bg-blue-50 text-blue-600 border-blue-200 px-3 py-1.5 text-sm font-medium"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Business Solutions
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Solusi AI untuk Bisnis Anda
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Jelaskan tantangan bisnis Anda dan dapatkan rekomendasi solusi AI yang disesuaikan untuk meningkatkan efisiensi dan pertumbuhan bisnis Anda.
        </p>
      </motion.div>

      {/* Problem Input Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="max-w-3xl mx-auto mb-16"
      >
        <form onSubmit={handleSubmit}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative">
              <Textarea
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Contoh: Saya kesulitan mengelola stok dan sering kehabisan barang di toko online saya..."
                className={cn(
                  "min-h-[160px] text-base pr-32 border-2 border-transparent",
                  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                  "group-hover:border-blue-400 transition-all duration-300 text-gray-800",
                  "text-lg placeholder-gray-400"
                )}
                disabled={isAnalyzing || isSubmitting}
                maxLength={1000}
              />
              <Button
                type="submit"
                className={cn(
                  "absolute right-3 bottom-3 transition-all duration-300 shadow-lg",
                  "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                  "transform hover:scale-105 active:scale-95",
                  !problem.trim() || isAnalyzing || isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                )}
                disabled={!problem.trim() || isAnalyzing || isSubmitting}
                size="lg"
              >
                {isAnalyzing || isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analisis Masalah
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setShowProblemsGuide(!showProblemsGuide)}
              className={cn(
                "text-blue-600 hover:text-blue-700 transition-colors flex items-center group text-sm",
                "bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg"
              )}
              aria-expanded={showProblemsGuide}
              aria-controls="problems-guide"
            >
              <HelpCircle className="w-4 h-4 mr-1.5 transition-transform group-hover:scale-110" />
              <span className="border-b border-transparent hover:border-blue-600">
                Contoh Masalah Bisnis Umum
              </span>
            </button>
            
            <div className={cn(
              "text-sm px-3 py-1 rounded-full",
              problem.length > 800 ? "bg-amber-50 text-amber-700" : "text-gray-500"
            )}>
              {problem.length}/1000 karakter
            </div>
          </div>
        </form>
        
        {/* Example Problems */}
        <AnimatePresence>
          {showProblemsGuide && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 overflow-hidden"
              id="problems-guide"
            >
              <p className="text-sm text-gray-500 mb-2">Klik untuk menggunakan contoh:</p>
              <div className="space-y-2">
                {exampleProblems.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="cursor-pointer text-left p-3 bg-gray-50 hover:bg-blue-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
                    onClick={() => handleExampleClick(example)}
                  >
                    <div className="flex items-start">
                      <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{example}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Section */}
      {showResults && (
        <motion.div 
          id="solutions-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Solusi yang Direkomendasikan
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berdasarkan analisis kami, berikut solusi yang dapat membantu mengatasi tantangan bisnis Anda
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="h-full"
              >
                <Card className="h-full overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:border-blue-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {solution.icon}
                      </div>
                      {getComplexityBadge(solution.complexity)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-gray-600 mb-6">{solution.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                          Manfaat Utama
                        </h4>
                        <ul className="space-y-3">
                          {solution.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle2 className="w-5 h-5 text-green-500 mr-2.5 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          {getTimelineBadge(solution.timeline)}
                          {getROIBadge(solution.estimatedROI)}
                        </div>
                      </div>

                      {/* Workflow Toggle and Display */}
                      <div className="mt-6">
                        <Button 
                          className="w-full group" 
                          size="lg"
                          variant="outline"
                          onClick={() => toggleWorkflow(solution.type)}
                        >
                          {expandedWorkflow === solution.type ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-2" />
                              Sembunyikan Alur Kerja
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4 mr-2" />
                              Lihat Alur Penyelesaian Masalah
                            </>
                          )}
                        </Button>

                        <AnimatePresence>
                          {expandedWorkflow === solution.type && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-6 mt-4 border-t border-gray-100">
                                <h4 className="font-semibold text-gray-800 mb-4">Tahapan Implementasi</h4>
                                <SolutionWorkflow solutionType={solution.type} />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

        {/* Before/After Comparison - Show visual impact */}
        {solutions.length > 0 && (
          <div className="mt-16">
            <BeforeAfterComparison solutionType={solutions[0].type} />
          </div>
        )}

        {/* Case Studies - Social proof */}
        {solutions.length > 0 && (
          <div className="mt-16">
            <CaseStudies solutionType={solutions[0].type} />
          </div>
        )}

        {/* Enhanced CTA - Better than old Final CTA */}
        <div className="mt-16">
          <EnhancedCTA />
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <SolutionFAQ />
        </div>

        {/* Try Again */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            onClick={() => {
              setShowResults(false);
              setProblem("");
              setSolutions([]);
            }}
          >
            Coba Masalah Lain
          </Button>
        </div>
      </motion.div>
    )}
    </div>
  );
};

export default AIBusinessSolver;
