import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Pesan terkirim!",
        description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 section-mobile">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15),transparent_50%)] animate-fade-in" />
        
        <div className="max-w-7xl mx-auto container-mobile relative z-10">
          <div className="max-w-3xl animate-slide-up">
            <Badge className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-700 border-blue-200/50 glass hover:bg-blue-200/80 transition-all duration-300 mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              Hubungi Kami
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Mari Diskusikan{" "}
              <span className="gradient-text-primary">Proyek Anda</span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Kami siap membantu mewujudkan ide Anda menjadi solusi teknologi yang nyata. 
              Hubungi kami untuk konsultasi gratis!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-mobile bg-white">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="animate-slide-up">
                <h2 className="text-2xl font-bold gradient-text-accent mb-6">
                  Informasi Kontak
                </h2>
                
                <div className="space-y-4">
                  <Card className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-200/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                        <a href="mailto:hadi.dev@domain.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          hadi.dev@domain.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-200/30 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Telepon</h3>
                        <a href="tel:+6281234567890" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          +62 812-3456-7890
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-200/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Lokasi</h3>
                        <p className="text-sm text-muted-foreground">
                          Jakarta, Indonesia
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="glass-card p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-200/30 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">Jam Kerja</h3>
                        <p className="text-sm text-muted-foreground">
                          Senin - Jumat: 09:00 - 18:00
                          <br />
                          Sabtu: 09:00 - 14:00
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="glass-card-mobile p-6 md:p-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-2xl font-bold gradient-text-accent mb-6">
                  Kirim Pesan
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="glass"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="glass"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subjek *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Konsultasi Proyek AI"
                      required
                      className="glass"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Pesan *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ceritakan tentang proyek atau kebutuhan Anda..."
                      required
                      rows={6}
                      className="glass resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="gradient"
                    disabled={isSubmitting}
                    className="w-full md:w-auto gap-2"
                  >
                    {isSubmitting ? (
                      <>Mengirim...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Booking Section */}
      {import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL && (
        <section className="section-mobile bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto container-mobile">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-1 space-y-4 animate-slide-up">
                <h2 className="text-2xl font-bold gradient-text-accent">Jadwalkan Meeting</h2>
                <p className="text-muted-foreground">
                  Pilih waktu yang cocok untuk Anda melalui Google Calendar Appointment.
                </p>
                <div>
                  <Button asChild variant="outline" className="glass">
                    <a
                      href={import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buka di Tab Baru
                    </a>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.05s" }}>
                <Card className="glass-card overflow-hidden">
                  <div className="aspect-[4/3] sm:aspect-video">
                    <iframe
                      src={import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL}
                      title="Book a meeting"
                      className="w-full h-full"
                      frameBorder="0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Map Section (Optional) */}
      <section className="section-mobile bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto container-mobile">
          <Card className="glass-card overflow-hidden animate-slide-up">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-semibold text-foreground">Jakarta, Indonesia</p>
                <p className="text-sm text-muted-foreground">Map placeholder</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
