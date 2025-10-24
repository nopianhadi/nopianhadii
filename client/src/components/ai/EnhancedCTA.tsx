import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Shield,
  Gift,
  Zap
} from "lucide-react";

export default function EnhancedCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8"
    >
      <Card className="overflow-hidden border-2">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 p-6 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">
            🎯 Siap Transform Bisnis Anda?
          </h3>
          <p className="text-blue-100">
            Pilih cara terbaik untuk mulai diskusi dengan tim kami
          </p>
        </div>

        {/* Two Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Option 1: Free Consultation */}
          <Card className="p-6 border-2 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
            <Badge className="mb-4 bg-green-600">
              <Gift className="w-3 h-3 mr-1" />
              100% GRATIS
            </Badge>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-50 rounded-full">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Konsultasi Gratis 30 Menit</h4>
                <p className="text-sm text-gray-600">Via Video Call atau Tatap Muka</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold text-gray-700">Yang Anda Dapatkan:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Diskusi mendalam tentang masalah bisnis Anda</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Review requirement & rekomendasi solusi terbaik</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Demo sistem (jika diperlukan)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Estimate timeline, budget, & ROI detail</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Proposal tertulis (jika interested)</span>
                </li>
              </ul>
            </div>

            <Button className="w-full mb-3 bg-blue-600 hover:bg-blue-700" size="lg" asChild>
              <a 
                href="https://calendly.com/hadiorigin/konsultasi-gratis" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Konsultasi Sekarang
              </a>
            </Button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Senin-Jumat, 9 AM - 5 PM</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>No Obligation</span>
              </div>
            </div>
          </Card>

          {/* Option 2: Instant WhatsApp */}
          <Card className="p-6 border-2 hover:border-green-500 hover:shadow-xl transition-all duration-300">
            <Badge className="mb-4 bg-orange-600">
              <Zap className="w-3 h-3 mr-1" />
              INSTANT RESPONSE
            </Badge>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Chat WhatsApp Langsung</h4>
                <p className="text-sm text-gray-600">Fast & Flexible</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold text-gray-700">Kenapa Pilih WhatsApp:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Response 5-10 menit</strong> di jam kerja (8 AM - 10 PM)</span>
                </li>
                <li className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Tanya-jawab cepat untuk pertanyaan spesifik</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Bisa share screenshot, dokumen, atau contoh</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Informal & friendly - no pressure sales</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <span>Bisa schedule video call dari chat juga</span>
                </li>
              </ul>
            </div>

            <Button className="w-full mb-3 bg-green-600 hover:bg-green-700" size="lg" asChild>
              <a 
                href="https://wa.me/62895406181407?text=Halo Hadi Origin, saya tertarik diskusi tentang solusi untuk bisnis saya. Bisa bantu?" 
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat WhatsApp Sekarang
              </a>
            </Button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Online Now</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" />
                <span>Avg response: 7 min</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom Trust Badges */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-green-600" />
              <span>Free Proposal</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" />
              <span>Fast Response</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-purple-600" />
              <span>No Obligation</span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
