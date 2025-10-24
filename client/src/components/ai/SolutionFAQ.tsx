import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, CheckCircle, Clock, Wrench, Shield, Zap } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const commonFAQs: FAQ[] = [
  {
    question: "Apakah bisa integrate dengan sistem yang sudah saya pakai sekarang?",
    answer: "Ya, absolutely! Kami bisa integrate dengan berbagai sistem:\n\n• POS System (Moka, iReap, Pawoon, dll)\n• Accounting Software (Accurate, Jurnal, Zahir)\n• E-commerce Platforms (Tokopedia, Shopee, WooCommerce)\n• ERP atau sistem custom Anda\n\nTim kami akan assess sistem existing dan design integration yang seamless tanpa disrupt operasional harian. Integrasi biasanya menggunakan API atau file export/import otomatis.",
    icon: <Zap className="w-5 h-5" />
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk training team saya?",
    answer: "Training included dalam paket dan sangat cepat!\n\n• Training session: 2-3 jam (hands-on, praktik langsung)\n• Video tutorial library: Bisa ditonton berulang kapan saja\n• User manual: Bahasa Indonesia, lengkap dengan screenshot\n• Practice time: Rata-rata staff mahir dalam 1-2 hari pemakaian\n\nSistem kami di-design user-friendly dengan interface yang intuitive. Bahkan staff yang tidak tech-savvy bisa pakai dengan mudah setelah training singkat.",
    icon: <Clock className="w-5 h-5" />
  },
  {
    question: "Bagaimana dengan maintenance dan support setelah project selesai?",
    answer: "Kami provide comprehensive support:\n\n**3 Bulan Support Gratis:**\n• Response time: < 4 jam untuk critical issues\n• Bug fixes: Unlimited (dalam warranty period)\n• System updates: Security patches & minor improvements\n• Consultation: Email, WhatsApp, atau remote support\n\n**Setelah 3 Bulan:**\n• Optional monthly maintenance package (mulai Rp 2 juta/bulan)\n• Atau pay-per-incident basis\n• Priority support untuk maintenance subscribers\n\nKami juga provide 1 tahun cloud hosting gratis dengan monitoring 24/7.",
    icon: <Wrench className="w-5 h-5" />
  },
  {
    question: "Apakah data saya aman? Bagaimana dengan security & backup?",
    answer: "Security adalah prioritas utama kami:\n\n**Data Security:**\n• SSL encryption untuk semua data transfer\n• Database encryption at rest\n• Role-based access control (RBAC)\n• Audit trail untuk track semua activities\n• Compliance dengan standar security Indonesia\n\n**Backup & Disaster Recovery:**\n• Daily automated backup ke cloud\n• 30 hari backup retention\n• 99.999% data durability (AWS/GCP)\n• Disaster recovery plan ready\n• Data center di Indonesia (untuk compliance)\n\nAnda punya full control atas data Anda. Bisa export kapan saja, data ownership 100% milik Anda.",
    icon: <Shield className="w-5 h-5" />
  },
  {
    question: "Kalau ada bug atau sistem error, bagaimana prosedurnya?",
    answer: "Kami punya clear escalation process:\n\n**Cara Report Issue:**\n1. WhatsApp: 0895-4061-81407 (fastest)\n2. Email: support@hadiorigin.com\n3. Dashboard: Submit ticket langsung dari sistem\n\n**Response Time Guarantee:**\n• Critical (sistem down): < 1 jam\n• High (major feature broken): < 4 jam\n• Medium (minor issue): < 24 jam\n• Low (enhancement request): < 3 hari\n\n**Resolution Process:**\n• Acknowledge: Langsung konfirmasi terima report\n• Diagnose: Identify root cause\n• Fix: Deploy hotfix atau workaround\n• Follow-up: Ensure issue fully resolved\n\nSetelah warranty period, response time sesuai maintenance package yang dipilih.",
    icon: <CheckCircle className="w-5 h-5" />
  },
  {
    question: "Apakah harga bisa negotiate atau ada paket installment?",
    answer: "Kami understand bahwa cash flow penting untuk bisnis:\n\n**Flexible Payment Options:**\n• Installment 3x tanpa bunga (30%-40%-30%)\n  - Down payment: 30% saat start project\n  - Progress payment: 40% saat 70% selesai\n  - Final payment: 30% saat handover\n\n• Installment 6x dengan bunga ringan (diskusi case by case)\n\n**Discount Opportunities:**\n• Early bird: 10% discount untuk booking 2 minggu ke depan\n• Referral: Rp 2 juta discount kalau refer klien lain\n• Bundle: Discount 15% kalau order 2+ solutions sekaligus\n\n**Price Negotiation:**\nHarga listed adalah standard. Untuk custom requirements atau budget constraints, bisa discuss. Kami will try best untuk find solution yang win-win.\n\nYang pasti: No hidden cost! Semua biaya transparent dari awal.",
    icon: <CheckCircle className="w-5 h-5" />
  }
];

export default function SolutionFAQ() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-8"
    >
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-600 rounded-full text-white">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Pertanyaan yang Sering Ditanyakan</h3>
            <p className="text-sm text-gray-600">
              Kami jawab pertanyaan umum untuk mempermudah keputusan Anda
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {commonFAQs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg border-2 border-gray-100 px-4"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600 flex-shrink-0">
                    {faq.icon}
                  </div>
                  <span className="font-semibold text-base">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 pb-4">
                <div className="ml-14 text-gray-700 leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Footer CTA */}
        <div className="mt-6 p-4 bg-white rounded-lg border-2 border-blue-200 text-center">
          <p className="text-sm text-gray-600 mb-3">
            Masih ada pertanyaan lain yang belum terjawab?
          </p>
          <Button variant="outline" asChild>
            <a 
              href="https://wa.me/62895406181407?text=Halo, saya punya beberapa pertanyaan tentang solusi yang Anda tawarkan"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Chat Langsung dengan Tim Kami
            </a>
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Response time: 5-10 menit (jam kerja) | 100% Free consultation
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
