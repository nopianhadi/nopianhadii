import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  X, 
  Send, 
  MessageCircle, 
  Sparkles,
  ExternalLink,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  action?: {
    label: string;
    href: string;
    external?: boolean;
  };
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat pagi";
    if (hour < 18) return "Selamat siang";
    return "Selamat malam";
  };

  // Initialize with greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: `${getGreeting()}! 👋\n\nSaya AI Assistant dari Hadi Origin. Senang bisa bantu Anda hari ini!\n\nMau tanya-tanya tentang:\n• 🎨 Portfolio & hasil karya project\n• 💰 Harga & paket development\n• ⚙️ Teknologi yang dipakai\n• 💬 Konsultasi gratis (no commitment!)\n\nLangsung tanya aja, saya siap jawab 😊`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // AI Response Logic (Rule-based)
  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();

    // Project/Portfolio queries
    if (input.includes('project') || input.includes('portfolio') || input.includes('karya') || input.includes('pernah') || input.includes('hasil')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '🎨 Wah, kebetulan banget nih! Saya sudah develop berbagai macam project keren loh!\n\nAda yang highlight nih:\n• AI Analytics Dashboard - Real-time insights\n• Smart CRM System - Auto follow-up\n• Business Intelligence - Data visualization\n• Custom Web Apps - Sesuai kebutuhan\n\nSemuanya production-ready dan sudah dipake klien! Mau lihat detail showcase-nya?',
        timestamp: new Date(),
        action: {
          label: '👀 Lihat Portfolio',
          href: '#projects'
        }
      };
    }

    // Pricing queries
    if (input.includes('harga') || input.includes('biaya') || input.includes('price') || input.includes('cost') || input.includes('berapa') || input.includes('mahal')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '💰 Oke, langsung to the point ya! Harga tergantung kompleksitas projectnya.\n\nAda 3 range harga:\n• **Starter** - Rp 15-25 juta\n  Website, Landing Page, Portfolio\n\n• **Business** - Rp 30-50 juta\n  Dashboard, CRM, Inventory System\n\n• **Enterprise** - Rp 75-150 juta\n  Custom AI App, Full Platform\n\nSemua paket sudah include:\n✅ Modern UI/UX design\n✅ Responsive (mobile-friendly)\n✅ Database & hosting setup\n✅ Deployment ke production\n✅ 3 bulan support gratis\n\nMau diskusi lebih detail untuk project Anda?',
        timestamp: new Date(),
        action: {
          label: '💬 Chat Detail Harga',
          href: 'https://wa.me/62895406181407?text=Halo, saya mau tanya detail harga untuk project saya',
          external: true
        }
      };
    }

    // Technology queries
    if (input.includes('tech') || input.includes('teknologi') || input.includes('stack') || input.includes('bahasa') || input.includes('pakai') || input.includes('gunakan')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '⚙️ Oke, ini tech stack yang saya pakai (semuanya modern & trusted!):\n\n**Frontend:**\n• React + TypeScript - Fast & scalable\n• Next.js / Vite - Framework terbaik\n• TailwindCSS - Styling cepat & consistent\n• Framer Motion - Animasi smooth\n\n**Backend:**\n• Node.js + Express - API yang robust\n• Supabase / PostgreSQL - Database reliable\n• REST API / GraphQL - Flexible architecture\n\n**AI/ML:**\n• OpenAI API - GPT-4, ChatGPT\n• Python + TensorFlow - ML models\n• Data Analytics - Insights automation\n\nSemuanya production-ready dan sudah teruji di 100+ projects!',
        timestamp: new Date()
      };
    }

    // Contact/Consultation queries
    if (input.includes('konsultasi') || input.includes('hubungi') || input.includes('kontak') || input.includes('whatsapp') || input.includes('diskusi') || input.includes('tanya')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '💬 Yuk, konsultasi GRATIS! Nggak ada commitment sama sekali kok.\n\nKita bisa discuss tentang:\n✅ Requirement project Anda (mau bikin apa)\n✅ Timeline realistis (berapa lama jadinya)\n✅ Budget estimation (range harga)\n✅ Tech recommendations (teknologi yang cocok)\n✅ Architecture planning (sistem design)\n\nResponse saya biasanya < 10 menit loh! Langsung aja chat via WhatsApp, lebih enak diskusinya 😊',
        timestamp: new Date(),
        action: {
          label: '💬 Chat WhatsApp Sekarang',
          href: 'https://wa.me/62895406181407?text=Halo Hadi, saya mau konsultasi project nih',
          external: true
        }
      };
    }

    // How it works
    if (input.includes('cara') || input.includes('proses') || input.includes('how') || input.includes('kerja') || input.includes('mulai') || input.includes('langkah')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '🔄 Gampang kok prosesnya! Simple & transparan:\n\n**1️⃣ Discovery Call** (30 menit - GRATIS)\n   Kita ngobrol santai, bahas apa yang Anda mau, goalnya apa, dll. No pressure!\n\n**2️⃣ Proposal & Quote** (1-2 hari)\n   Saya buatin proposal lengkap: scope detail, timeline, breakdown harga. Kalau oke, lanjut!\n\n**3️⃣ Development** (2-8 minggu)\n   Proses coding: Design → Build → Test → Deploy. Ada progress updates rutin.\n\n**4️⃣ Launch & Support** (3 bulan gratis)\n   Training team Anda, fixes kalau ada bug, maintenance rutin.\n\nSemua transparan, nggak ada hidden cost. Ada pertanyaan? Langsung tanya aja!',
        timestamp: new Date(),
        action: {
          label: '📞 Mulai Konsultasi',
          href: 'https://wa.me/62895406181407?text=Halo, saya mau tahu lebih detail tentang prosesnya',
          external: true
        }
      };
    }

    // AI Features query
    if (input.includes('ai') || input.includes('artificial') || input.includes('machine learning') || input.includes('otomatis') || input.includes('chatbot')) {
      return {
        id: Date.now().toString(),
        type: 'bot',
        content: '🤖 Nah ini spesialisasi saya! AI applications bisa game-changer buat bisnis loh.\n\nYang bisa saya develop:\n\n**Chatbot & Virtual Assistant**\n• Auto-reply customer 24/7\n• Handle 80% pertanyaan repetitif\n• Save waktu CS team\n\n**Predictive Analytics**\n• Forecast sales/demand\n• Detect patterns & trends\n• Optimize inventory\n\n**Smart Automation**\n• Auto-categorize data\n• Image/document processing\n• Recommendation systems\n\nAI bisa save 10-15 jam per minggu untuk bisnis! Real ROI-nya bisa 300-500% dalam setahun.\n\nMau bahas use case spesifik untuk bisnis Anda?',
        timestamp: new Date(),
        action: {
          label: '🚀 Diskusi AI Project',
          href: 'https://wa.me/62895406181407?text=Halo, saya tertarik develop AI application untuk bisnis saya',
          external: true
        }
      };
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: 'bot',
      content: '🤔 Hmm, sorry saya belum terlalu paham maksudnya nih.\n\nCoba tanya yang lebih specific ya, misal:\n• "Berapa harga untuk bikin dashboard?"\n• "Teknologi apa yang kamu pakai?"\n• "Gimana cara konsultasinya?"\n• "Ada portfolio projects apa aja?"\n• "Bisa bikin chatbot AI nggak?"\n\nAtau kalau mau lebih enak, langsung aja chat via WhatsApp! Saya jawab lebih detail & cepet kok 😊',
      timestamp: new Date(),
      action: {
        label: '💬 Chat via WhatsApp',
        href: 'https://wa.me/62895406181407?text=Halo, saya mau tanya-tanya project',
        external: true
      }
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI typing
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick actions
  const quickActions = [
    { label: "💰 Berapa harganya?", query: "Berapa harga development?" },
    { label: "🎨 Lihat portfolio", query: "Lihat portfolio projects" },
    { label: "💬 Mau konsultasi", query: "Gimana cara konsultasi?" },
    { label: "🤖 Bikin AI app", query: "Bisa bikin aplikasi AI nggak?" }
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="lg"
          className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-br from-primary-600 to-blue-600 hover:from-primary-700 hover:to-blue-700 transition-all duration-300 relative group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Bot className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-primary-400 animate-ping opacity-20" />
          )}

          {/* Badge */}
          {!isOpen && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white border-2 border-white text-xs px-2">
              AI
            </Badge>
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] z-50"
          >
            <Card className="shadow-2xl border-2 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-600 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold">AI Assistant</h3>
                      <p className="text-xs opacity-90">Siap bantu kapan saja</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs">Online</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`rounded-2xl p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary-600 text-white rounded-br-none' 
                          : 'bg-white border border-gray-200 rounded-bl-none'
                      }`}>
                        <p className="text-sm whitespace-pre-line leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      
                      {message.action && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mt-2"
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            asChild
                          >
                            <a
                              href={message.action.href}
                              target={message.action.external ? "_blank" : undefined}
                              rel={message.action.external ? "noopener noreferrer" : undefined}
                            >
                              {message.action.label}
                              {message.action.external && <ExternalLink className="w-3 h-3 ml-1" />}
                            </a>
                          </Button>
                        </motion.div>
                      )}
                      
                      <p className="text-xs text-gray-400 mt-1">
                        {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length <= 1 && (
                <div className="p-3 bg-white border-t flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => {
                        setInput(action.query);
                        setTimeout(() => handleSend(), 100);
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pertanyaan..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                  Powered by AI • Tekan Enter untuk kirim
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
