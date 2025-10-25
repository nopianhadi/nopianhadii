import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin, Github, Mail, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { TeamMember } from "@shared/schema";

const fallbackTeamMembers = [
  {
    name: "Hadi Setiawan",
    role: "Lead Developer & Founder",
    expertise: ["React", "Next.js", "Full-Stack"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hadi",
    bio: "10+ tahun pengalaman dalam web development dan mobile app development",
    social: {
      linkedin: "#",
      github: "#",
      email: "hadi@domain.com"
    }
  },
  {
    name: "Sarah Wijaya",
    role: "UI/UX Designer",
    expertise: ["Figma", "User Research", "Prototyping"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Spesialis dalam menciptakan desain yang user-friendly dan modern",
    social: {
      linkedin: "#",
      github: "#",
      email: "sarah@domain.com"
    }
  },
  {
    name: "Budi Santoso",
    role: "Mobile Developer",
    expertise: ["React Native", "Flutter", "iOS/Android"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
    bio: "Expert dalam pengembangan aplikasi mobile cross-platform",
    social: {
      linkedin: "#",
      github: "#",
      email: "budi@domain.com"
    }
  },
  {
    name: "Dewi Lestari",
    role: "Frontend Developer",
    expertise: ["React", "TypeScript", "CSS"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi",
    bio: "Mengubah desain menjadi kode yang clean dan performant",
    social: {
      linkedin: "#",
      github: "#",
      email: "dewi@domain.com"
    }
  }
];

export default function Team() {
  const { data: teamMembers, isLoading, error } = useQuery<TeamMember[]>({
    queryKey: ["team-members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('status', 'active')
        .order('display_order', { ascending: true });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  const displayMembers = teamMembers && teamMembers.length > 0 ? teamMembers : fallbackTeamMembers;

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50" id="team">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-8 shadow-xl">
              <Award className="w-5 h-5" />
              Tim Profesional
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
              Bertemu dengan Tim Kami
            </h2>
            <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Tim ahli yang berdedikasi untuk menghadirkan solusi web dan mobile development terbaik untuk bisnis Anda
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative group">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                
                <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden shadow-lg p-8">
                  <div className="space-y-6">
                    <Skeleton className="w-24 h-24 mx-auto rounded-full" />
                    <div className="text-center space-y-3">
                      <Skeleton className="h-6 w-32 mx-auto" />
                      <Skeleton className="h-5 w-24 mx-auto" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <Skeleton className="h-10 w-10 rounded-xl" />
                      <Skeleton className="h-10 w-10 rounded-xl" />
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
    <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden" id="team">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 sm:mb-20 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-8 shadow-xl">
            <Award className="w-5 h-5" />
            Tim Profesional
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-8 leading-tight">
            Bertemu dengan Tim Kami
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Tim ahli yang berdedikasi untuk menghadirkan solusi web dan mobile development terbaik untuk bisnis Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayMembers.map((member: any, index: number) => (
            <div key={index} className="relative group">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
              
              <Card
                className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:-translate-y-3 p-8"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-testid={`card-team-${index + 1}`}
              >
                <div className="space-y-6">
                  {/* Avatar with enhanced gradient border */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
                    <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-2xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="text-center space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-base font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                        {member.role}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {member.bio}
                    </p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.slice(0, 3).map((skill: string, idx: number) => (
                      <Badge
                        key={idx}
                        className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-200 text-xs px-3 py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {member.expertise.length > 3 && (
                      <Badge className="bg-gray-100 text-gray-600 text-xs px-3 py-1">
                        +{member.expertise.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center gap-3 pt-4 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-xl"
                      asChild
                    >
                      <a href={member.linkedinUrl || member.social?.linkedin || '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-xl"
                      asChild
                    >
                      <a href={member.githubUrl || member.social?.github || '#'} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <Github className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-10 w-10 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-xl"
                      asChild
                    >
                      <a href={`mailto:${member.email || member.social?.email || ''}`} aria-label="Email">
                        <Mail className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
