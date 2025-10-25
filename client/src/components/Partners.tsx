import { Building2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Partner } from "@shared/schema";

// Fallback partners if database is empty
const fallbackPartners = [
  { name: "TechStart Indonesia", logo: "https://placehold.co/120x60/3B82F6/FFFFFF?text=TechStart", color: "#3B82F6" },
  { name: "E-Commerce Plus", logo: "https://placehold.co/120x60/8B5CF6/FFFFFF?text=E-Commerce", color: "#8B5CF6" },
  { name: "FinTech Solutions", logo: "https://placehold.co/120x60/06B6D4/FFFFFF?text=FinTech", color: "#06B6D4" },
  { name: "LogisTech Corp", logo: "https://placehold.co/120x60/10B981/FFFFFF?text=LogisTech", color: "#10B981" },
  { name: "Digital Agency Pro", logo: "https://placehold.co/120x60/F59E0B/FFFFFF?text=Digital", color: "#F59E0B" },
  { name: "HealthTech Startup", logo: "https://placehold.co/120x60/EF4444/FFFFFF?text=HealthTech", color: "#EF4444" },
  { name: "AI Innovations", logo: "https://placehold.co/120x60/6366F1/FFFFFF?text=AI+Innovations", color: "#6366F1" },
  { name: "Cloud Systems", logo: "https://placehold.co/120x60/EC4899/FFFFFF?text=Cloud", color: "#EC4899" },
];

export default function Partners() {
  // Fetch partners from database
  const { data: partnersData } = useQuery<Partner[]>({
    queryKey: ["partners-public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("status", "active")
        .order("display_order");
      
      if (error) {
        console.error("Error fetching partners:", error);
        return [];
      }
      return data || [];
    },
  });

  // Use database data if available, otherwise use fallback
  const partners = partnersData && partnersData.length > 0 ? partnersData : fallbackPartners;
  return (
    <section className="py-12 lg:py-16 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-4">
            <Building2 className="w-4 h-4" />
            Partner & Klien Kami
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            Dipercaya oleh Perusahaan Terkemuka
          </h2>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            50+ perusahaan mempercayai kami untuk transformasi digital mereka
          </p>
        </div>

        {/* Compact Logo Slider */}
        <div className="relative py-4">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Compact Row - Smooth Scroll */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-smooth">
              {/* Duplicate for seamless loop */}
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={`partner-${index}`}
                  className="flex-shrink-0 mx-2 bg-white border border-gray-200 p-3 rounded-lg hover:border-blue-300 hover:scale-105 transition-all duration-300 group"
                  style={{ width: "140px", height: "60px" }}
                >
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Stats */}
        <div className="grid grid-cols-4 gap-4 mt-8">
          {[
            { value: "50+", label: "Partner" },
            { value: "100+", label: "Proyek" },
            { value: "98%", label: "Puas" },
            { value: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              <div className="text-lg md:text-xl font-bold text-blue-600 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scroll-smooth {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-smooth {
          animation: scroll-smooth 40s linear infinite;
        }

        /* Pause animation on hover */
        .animate-scroll-smooth:hover {
          animation-play-state: paused;
        }

        /* Mobile optimization */
        @media (max-width: 768px) {
          .animate-scroll-smooth {
            animation: scroll-smooth 25s linear infinite;
          }
        }
      `}</style>
    </section>
  );
}
