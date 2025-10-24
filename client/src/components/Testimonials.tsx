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
    text: "Dashboard AI yang dibangun oleh tim Hadi Origin benar-benar mengubah cara kami menganalisis data. ROI meningkat 300% dalam 6 bulan pertama!",
    project: "AI Analytics Dashboard"
  },
  {
    name: "Siti Nurhaliza",
    role: "Product Manager",
    company: "E-Commerce Plus",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
    rating: 5,
    text: "Profesional, cepat, dan hasil melebihi ekspektasi. Sistem CRM dengan AI recommendation yang mereka buat sangat membantu tim sales kami.",
    project: "AI-Powered CRM"
  },
  {
    name: "Rudi Hermawan",
    role: "CTO",
    company: "FinTech Solutions",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi",
    rating: 5,
    text: "Integrasi AI untuk fraud detection yang mereka kembangkan menyelamatkan perusahaan kami dari kerugian jutaan rupiah. Highly recommended!",
    project: "Fraud Detection System"
  },
  {
    name: "Maya Kusuma",
    role: "Operations Director",
    company: "LogisTech Corp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    rating: 5,
    text: "Platform otomasi warehouse dengan AI yang mereka bangun meningkatkan efisiensi operasional kami hingga 250%. Tim yang sangat kompeten!",
    project: "Warehouse Automation"
  },
  {
    name: "Dimas Prasetyo",
    role: "Marketing Head",
    company: "Digital Agency Pro",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dimas",
    rating: 5,
    text: "AI content generator dan analytics tool yang mereka develop sangat membantu campaign kami. Response time cepat dan support excellent!",
    project: "Marketing AI Tools"
  },
  {
    name: "Linda Wijaya",
    role: "Founder",
    company: "HealthTech Startup",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Linda",
    rating: 5,
    text: "Sistem appointment dan patient management dengan AI prediction yang mereka buat sangat user-friendly. Pasien dan staff kami sangat puas!",
    project: "Healthcare Management System"
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
      <section className="section-mobile bg-gradient-to-b from-white to-gray-50 animate-fade-in" id="testimonials">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-12 md:mb-16 animate-slide-up">
            <Badge className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 border-primary-200/50 hover:bg-primary-100 transition-all duration-300 text-mobile-sm px-4 py-1.5 rounded-full font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              Testimoni Klien
            </Badge>
            <h2 className="text-mobile-2xl tracking-tight text-gray-900 font-bold">
              Apa Kata Klien Kami
            </h2>
            <p className="text-mobile-base text-gray-600 max-w-2xl mx-auto font-normal">
              Kepercayaan dan kepuasan klien adalah prioritas utama kami
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6 hover:shadow-lg transition-all">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-6 w-32" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-mobile bg-gradient-to-b from-white to-gray-50 animate-fade-in" id="testimonials">
      <div className="max-w-7xl mx-auto container-mobile">
        <div className="text-center space-y-4 mb-12 md:mb-16 animate-slide-up">
          <Badge className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 border-primary-200/50 hover:bg-primary-100 transition-all duration-300 text-mobile-sm px-4 py-1.5 rounded-full font-medium">
            <MessageSquare className="w-3.5 h-3.5" />
            Testimoni Klien
          </Badge>
          <h2 className="text-mobile-2xl tracking-tight text-gray-900 font-bold">
            Apa Kata Klien Kami
          </h2>
          <p className="text-mobile-base text-gray-600 max-w-2xl mx-auto font-normal">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {displayTestimonials.map((testimonial: any, index: number) => (
            <Card
              key={index}
              className="bg-white border border-gray-100 rounded-2xl hover:border-primary-200 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 animate-slide-up group relative overflow-hidden p-2 sm:p-3 md:p-4 lg:p-6"
              style={{ animationDelay: `${index * 0.1}s` }}
              data-testid={`card-testimonial-${index + 1}`}
            >
              {/* Quote Icon Background */}
              <div className="absolute top-3 right-3 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300">
                <Quote className="w-20 h-20 text-primary" />
              </div>

              <div className="space-y-4 relative z-10">
                {/* Rating Stars */}
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-sm"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-sm text-foreground/80 leading-relaxed min-h-[5rem]">
                  "{testimonial.text}"
                </p>

                {/* Project Badge */}
                <div>
                  <Badge variant="outline" className="text-xs px-2.5 py-0.5 font-medium">
                    {testimonial.project}
                  </Badge>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-1"></div>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="relative flex-shrink-0">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-sm opacity-30 group-hover:opacity-50 transition-all duration-300"></div>
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300 truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-muted-foreground/80 truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 md:mt-16 text-center animate-fade-in">
          <div className="inline-flex flex-col items-center gap-3 p-8 md:p-10 glass-card rounded-2xl max-w-2xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center mb-2">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg md:text-xl font-bold gradient-text-primary">
              Siap Menjadi Klien Kami Selanjutnya?
            </h3>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Bergabunglah dengan 50+ perusahaan yang telah mempercayai kami untuk transformasi digital mereka
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
