import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Brain,
  Zap,
  TrendingUp,
  MessageSquare,
  Image as ImageIcon,
  Code,
  BarChart3,
  ChevronRight
} from "lucide-react";

interface Demo {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
}

const demos: Demo[] = [
  {
    id: "chat",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "AI Chatbot",
    description: "Intelligent conversational AI dengan natural language understanding",
    color: "text-blue-600",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "analytics",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Predictive Analytics",
    description: "Machine learning untuk forecasting dan data insights",
    color: "text-purple-600",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "vision",
    icon: <ImageIcon className="w-6 h-6" />,
    title: "Computer Vision",
    description: "Image recognition, object detection, dan visual analysis",
    color: "text-green-600",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "code",
    icon: <Code className="w-6 h-6" />,
    title: "Code Generation",
    description: "AI-powered code completion dan bug detection",
    color: "text-orange-600",
    gradient: "from-orange-500 to-red-500"
  }
];

export default function AIFeatureShowcase() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string>("");

  const handleDemoClick = (demoId: string) => {
    setActiveDemo(demoId);
    setIsProcessing(true);
    setResult("");

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Generate demo-specific results
      const results: Record<string, string> = {
        chat: "✨ Chatbot berhasil memahami pertanyaan dan memberikan response yang relevan dengan confidence score 94.5%",
        analytics: "📊 Model prediksi menunjukkan trend growth 23% untuk Q3 dengan accuracy 91.2%. Detected anomaly pada tanggal 15-18.",
        vision: "🎯 Terdeteksi 12 objects dengan precision 96.8%: Person (4), Car (5), Building (2), Tree (1)",
        code: "💻 Code optimization completed: Reduced complexity from O(n²) to O(n log n). Detected 3 potential bugs, suggested 5 improvements."
      };
      
      setResult(results[demoId] || "Processing completed successfully!");
    }, 2000 + Math.random() * 1000);
  };

  const stats = [
    { label: "Accuracy", value: "94.5%", icon: <TrendingUp className="w-4 h-4" /> },
    { label: "Speed", value: "1.2s", icon: <Zap className="w-4 h-4" /> },
    { label: "Models", value: "15+", icon: <Brain className="w-4 h-4" /> }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-blue-50/30 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-primary-50 text-primary-600 border-primary-200/50">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Features
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Rasakan Kekuatan{" "}
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Coba langsung demo interaktif AI features yang bisa kami integrasikan ke aplikasi Anda
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-2 text-primary-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {demos.map((demo, index) => (
            <motion.div
              key={demo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                  activeDemo === demo.id ? 'ring-2 ring-primary-500 shadow-xl' : ''
                }`}
                onClick={() => handleDemoClick(demo.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${demo.gradient} text-white`}>
                    {demo.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{demo.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
                    <Button
                      size="sm"
                      variant={activeDemo === demo.id ? "default" : "outline"}
                      className="group"
                    >
                      {activeDemo === demo.id ? 'Processing...' : 'Try Demo'}
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Result Display */}
        <AnimatePresence mode="wait">
          {activeDemo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 bg-gradient-to-br from-gray-50 to-white border-2">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-primary-600" />
                  <h3 className="font-bold text-lg">AI Processing Result</h3>
                </div>

                {isProcessing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
                        <Sparkles className="w-6 h-6 text-primary-600 absolute inset-0 m-auto" />
                      </div>
                      <div>
                        <p className="font-medium">Processing with AI...</p>
                        <p className="text-sm text-gray-600">Analyzing data dan generating insights</p>
                      </div>
                    </div>
                    
                    {/* Progress bars */}
                    <div className="space-y-2">
                      {['Data Loading', 'AI Analysis', 'Generating Result'].map((step, idx) => (
                        <div key={step} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{step}</span>
                            <span className="text-primary-600">
                              {idx === 0 ? '100%' : idx === 1 ? '67%' : '23%'}
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: idx === 0 ? '100%' : idx === 1 ? '67%' : '23%' }}
                              transition={{ duration: 1, delay: idx * 0.3 }}
                              className="h-full bg-gradient-to-r from-primary-600 to-blue-600"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-white rounded-lg border border-green-200">
                      <p className="text-gray-700 leading-relaxed">{result}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span>Processed in {(2 + Math.random()).toFixed(2)}s</span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setActiveDemo(null);
                          setResult("");
                        }}
                      >
                        Try Another Demo
                      </Button>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Tertarik integrasikan AI ke bisnis Anda?
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700"
            asChild
          >
            <a href="https://wa.me/62895406181407?text=Saya%20tertarik%20develop%20AI%20application">
              <Sparkles className="w-5 h-5 mr-2" />
              Konsultasi AI Project
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
