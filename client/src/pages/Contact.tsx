import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, MessageSquare, MessageCircle, Clock, ArrowRight } from "lucide-react";
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
      <section className="section-spacing-lg bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative z-10">
          <div className="max-w-5xl mx-auto text-center google-fade-in">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8 shadow-lg">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              Hubungi Kami
            </div>
            
            <h1 className="text-hero-title bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6 sm:mb-8">
              Mari Diskusikan{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">Proyek Anda</span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Wujudkan ide Anda menjadi website & aplikasi mobile yang luar biasa. Konsultasi gratis untuk proyek Anda!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20project%20saya" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-consistent bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#contact-form" 
                className="btn-secondary-consistent"
              >
                <span>Kirim Pesan</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="section-spacing-lg bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="google-fade-in">
                <h2 className="text-section-title bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6 sm:mb-8">
                  Informasi Kontak
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  {[
                    {
                      icon: <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
                      title: "WhatsApp",
                      content: "+62 895-4061-81407",
                      description: "Respon cepat dalam 1 jam",
                      href: "https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20project%20saya",
                      gradient: "from-green-500 to-green-600",
                      primary: true
                    },
                    {
                      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
                      title: "Email",
                      content: "nopianhadi2@gmail.com",
                      description: "Respon dalam 24 jam",
                      href: "mailto:nopianhadi2@gmail.com",
                      gradient: "from-blue-500 to-blue-600"
                    },
                    {
                      icon: <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
                      title: "Telepon",
                      content: "+62 895-4061-81407",
                      description: "Senin - Jumat: 09:00 - 18:00",
                      href: "tel:+62895406181407",
                      gradient: "from-blue-600 to-cyan-500"
                    },
                    {
                      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
                      title: "Lokasi",
                      content: "Jakarta, Indonesia",
                      description: "Meeting by appointment",
                      href: null,
                      gradient: "from-cyan-500 to-blue-500"
                    }
                  ].map((contact, index) => (
                    <div key={index} className="card-consistent">
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`p-2 sm:p-3 bg-gradient-to-br ${contact.gradient} rounded-xl shadow-lg flex-shrink-0`}>
                          {contact.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 sm:mb-2">
                            <h3 className="text-card-title">{contact.title}</h3>
                            {contact.primary && (
                              <Badge className="badge-consistent badge-primary-consistent text-xs">Recommended</Badge>
                            )}
                          </div>
                          {contact.href ? (
                            <a 
                              href={contact.href} 
                              target={contact.href.startsWith('http') ? '_blank' : undefined} 
                              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined} 
                              className="text-card-description hover:text-primary transition-colors leading-relaxed block mb-1 break-all"
                            >
                              {contact.content}
                            </a>
                          ) : (
                            <p className="text-card-description leading-relaxed mb-1">
                              {contact.content}
                            </p>
                          )}
                          <p className="text-xs sm:text-sm text-muted-foreground">{contact.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-consistent google-fade-in" style={{ animationDelay: "0.1s" }}>
                <h2 className="text-section-title bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 bg-clip-text text-transparent mb-6 sm:mb-8">
                  Kirim Pesan
                </h2>
              
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2 sm:space-y-3">
                      <Label htmlFor="name" className="text-sm sm:text-base font-semibold text-foreground">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="h-10 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <Label htmlFor="email" className="text-sm sm:text-base font-semibold text-foreground">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="h-10 sm:h-12 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Label htmlFor="subject" className="text-sm sm:text-base font-semibold text-foreground">Subjek *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Konsultasi Website/Aplikasi Mobile"
                      required
                      className="h-10 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Label htmlFor="message" className="text-sm sm:text-base font-semibold text-foreground">Pesan *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ceritakan tentang website atau aplikasi mobile yang ingin Anda buat. Sertakan fitur-fitur yang diinginkan, target audience, dan timeline proyek..."
                      required
                      rows={5}
                      className="text-sm sm:text-base resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto portfolio-button primary"
                  >
                    {isSubmitting ? (
                      <>Mengirim...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Kirim Pesan</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Booking Section */}
      {import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL && (
        <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start">
              <div className="lg:col-span-1 space-y-6 animate-slide-up">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">Jadwalkan Meeting</h2>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Pilih waktu yang cocok untuk Anda melalui Google Calendar Appointment.
                </p>
                <div>
                  <Button asChild className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl px-6 py-3">
                    <a
                      href={import.meta.env.VITE_GOOGLE_APPOINTMENTS_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <span>Buka di Tab Baru</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.05s" }}>
                <div className="relative group">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  
                  <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden shadow-2xl">
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
          </div>
        </section>
      )}

      {/* Map Section (Optional) */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative group">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden shadow-2xl animate-slide-up">
              <div className="aspect-video bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-2xl mb-6">
                    <MapPin className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-2">Jakarta, Indonesia</h3>
                  <p className="text-lg text-gray-600">Map placeholder - Lokasi kantor kami</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
