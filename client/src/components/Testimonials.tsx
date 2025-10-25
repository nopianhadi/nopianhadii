import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Quote, MessageSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@shared/schema";

const fallbackTestimonials = [
  {
    name: "Andi Pratama",
    role: "CEO",
    company: "TechStart Indonesia",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andi",
    rating: 5,
    text: "Website company profile yang dibangun oleh tim Hadi Origin sangat profesional dan modern. Conversion rate meningkat 200% setelah website baru diluncurkan!",
    project: "Company Profile Website"
  },
  {
    name: "Siti Nurhaliza",
    role: "Product Manager",
    company: "E-Commerce Plus",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
    rating: 5,
    text: "Profesional, cepat, dan hasil melebihi ekspektasi. E-commerce website yang mereka buat sangat user-friendly dan fitur-fiturnya lengkap.",
    project: "E-Commerce Website"
  },
  {
    name: "Rudi Hermawan",
    role: "CTO",
    company: "FinTech Solutions",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi",
    rating: 5,
    text: "Aplikasi mobile yang mereka kembangkan sangat stabil dan performanya excellent. User experience yang luar biasa! Highly recommended!",
    project: "Mobile Banking App"
  },
  {
    name: "Maya Kusuma",
    role: "Operations Director",
    company: "LogisTech Corp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    rating: 5,
    text: "Website dan aplikasi mobile untuk tracking logistik yang mereka bangun sangat membantu operasional kami. Tim yang sangat kompeten!",
    project: "Logistics Web & Mobile App"
  },
  {
    name: "Dimas Prasetyo",
    role: "Marketing Head",
    company: "Digital Agency Pro",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dimas",
    rating: 5,
    text: "Landing page dan website portfolio yang mereka develop sangat menarik dan responsive. Response time cepat dan support excellent!",
    project: "Portfolio Website"
  },
  {
    name: "Linda Wijaya",
    role: "Founder",
    company: "HealthTech Startup",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
    rating: 5,
    text: "Aplikasi mobile untuk appointment booking yang mereka buat sangat user-friendly. Pasien dan staff kami sangat puas dengan kemudahan penggunaannya!",
    project: "Healthcare Mobile App"
  }
];

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'active')
        .order('display_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials;

  if (isLoading) {
    return (
      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden" id="testimonials">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-8 shadow-xl">
              <MessageSquare className="w-5 h-5" />
              Testimoni Klien
            </div>
            <h2 className="text-section-title font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
              Apa Kata Klien Kami
            </h2>
            <p className="text-section-subtitle text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Kepercayaan dan kepuasan klien adalah prioritas utama kami dalam setiap project
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative group">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                
                <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden shadow-lg p-8">
                  <div className="space-y-6">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-6 w-32" />
                    <div className="h-px bg-gray-200"></div>
                    <div className="flex items-center gap-4">
                      <Skeleton className="w-16 h-16 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-32 mb-2" />
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-white" id="testimonials">
      
      <div className="container-responsive relative">
        <div className="text-center element-spacing-lg animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-badge-sm font-medium-responsive element-spacing-sm shadow-xl">
            <MessageSquare className="icon-mobile-sm" />
            Testimoni Klien
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Apa Kata Klien Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami dalam setiap project
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial: any, index: number) => (
            <div key={index} className="relative group">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              
              <Card
                className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 p-8 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-testimonial-${index + 1}`}
              >
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 opacity-[0.1] group-hover:opacity-[0.2] transition-opacity duration-300">
                  <Quote className="w-16 h-16 text-blue-500" />
                </div>

                <div className="space-y-6 relative z-10">
                  {/* Rating Stars */}
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-base text-gray-700 leading-relaxed min-h-[6rem]">
                    "{testimonial.text}"
                  </p>

                  {/* Project Badge */}
                  <div>
                    <Badge className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-200 text-sm px-3 py-1">
                      {testimonial.project}
                    </Badge>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                  {/* Client Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm opacity-30 group-hover:opacity-60 transition-all duration-300"></div>
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-xl">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 font-medium">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl p-12 shadow-2xl max-w-2xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-6 mx-auto shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4">
                Siap Menjadi Klien Kami Selanjutnya?
              </h3>
              <p className="text-lg text-gray-700 max-w-md mx-auto leading-relaxed">
                Bergabunglah dengan 50+ perusahaan yang telah mempercayai kami untuk transformasi digital mereka
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
