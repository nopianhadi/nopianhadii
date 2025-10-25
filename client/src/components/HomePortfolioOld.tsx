import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingCard } from "@/components/ui/loading-spinner";
import PortfolioStats from "@/components/PortfolioStats";
import OptimizedImage from "@/components/OptimizedImage";
import { ExternalLink, Eye, Star, Calendar, Briefcase, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";

// Fallback projects untuk demo - Fokus Web Dev & App Development
const fallbackProjects = [
  {
    id: "1",
    title: "Platform E-Commerce Modern",
    description: "Solusi e-commerce lengkap dengan sistem pembayaran terintegrasi, manajemen inventory real-time, dashboard admin yang powerful, dan optimasi SEO untuk meningkatkan penjualan online.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "Web Development",
    techStack: ["React", "Next.js", "TypeScript", "Stripe", "Tailwind CSS", "PostgreSQL"],
    demoUrl: "https://demo-ecommerce.com",
    githubUrl: "https://github.com/demo/ecommerce",
    featured: 1,
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Aplikasi Delivery & Logistik",
    description: "Aplikasi mobile untuk layanan delivery dengan fitur real-time tracking GPS, sistem pembayaran digital, rating & review, dan notifikasi push untuk pengalaman pengguna yang optimal.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Firebase", "Google Maps API", "Stripe", "Redux"],
    demoUrl: "https://demo-delivery.com",
    githubUrl: "https://github.com/demo/delivery",
    featured: 1,
    status: "active",
    createdAt: "2024-02-10"
  },
  {
    id: "3",
    title: "Website Corporate Professional",
    description: "Website company profile dengan desain modern dan responsif, optimasi SEO tingkat lanjut, sistem CMS untuk update konten, dan integrasi dengan social media untuk branding yang kuat.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Web Development",
    techStack: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    demoUrl: "https://demo-corporate.com",
    githubUrl: "https://github.com/demo/corporate",
    featured: 0,
    status: "active",
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    title: "Sistem Manajemen Bisnis",
    description: "Platform manajemen bisnis terintegrasi dengan fitur CRM, inventory management, laporan keuangan, dan dashboard analytics untuk membantu mengoptimalkan operasional perusahaan.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Node.js", "Express", "PostgreSQL", "Socket.io", "Chart.js"],
    demoUrl: "https://demo-business.com",
    githubUrl: "https://github.com/demo/business",
    featured: 0,
    status: "active",
    createdAt: "2024-03-05"
  },
  {
    id: "5",
    title: "Platform E-Learning Interaktif",
    description: "Sistem pembelajaran online dengan video streaming HD, quiz interaktif, progress tracking, sertifikat digital, dan forum diskusi untuk pengalaman belajar yang engaging.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Next.js", "Prisma", "AWS S3", "WebRTC", "Socket.io"],
    demoUrl: "https://demo-learning.com",
    githubUrl: "https://github.com/demo/learning",
    featured: 1,
    status: "active",
    createdAt: "2024-02-28"
  },
  {
    id: "6",
    title: "Aplikasi Produktivitas & Task Management",
    description: "Aplikasi mobile untuk manajemen tugas dan produktivitas dengan fitur kolaborasi tim, time tracking, reminder otomatis, dan sinkronisasi cloud untuk efisiensi kerja maksimal.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Redux Toolkit", "Firebase", "AsyncStorage", "Push Notifications"],
    demoUrl: "https://demo-productivity.com",
    githubUrl: "https://github.com/demo/productivity",
    featured: 0,
    status: "active",
    createdAt: "2024-01-30"
  },
  {
    id: "7",
    title: "Dashboard Analytics & Reporting",
    description: "Dashboard business intelligence dengan visualisasi data real-time, custom reports, export ke berbagai format, dan integrasi dengan multiple data sources untuk insight bisnis yang mendalam.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "D3.js", "Chart.js", "Node.js", "MongoDB", "Redis"],
    demoUrl: "https://demo-analytics.com",
    githubUrl: "https://github.com/demo/analytics",
    featured: 1,
    status: "active",
    createdAt: "2024-03-15"
  },
  {
    id: "8",
    title: "Aplikasi Fintech & Payment",
    description: "Aplikasi keuangan digital dengan fitur transfer uang, pembayaran tagihan, investasi, dan wallet digital yang aman dengan enkripsi tingkat bank dan compliance yang ketat.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Node.js", "PostgreSQL", "JWT", "Stripe", "Plaid API"],
    demoUrl: "https://demo-fintech.com",
    githubUrl: "https://github.com/demo/fintech",
    featured: 1,
    status: "active",
    createdAt: "2024-04-01"
  }
];

export default function HomePortfolio() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["home-portfolio-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching projects:', error);
        return fallbackProjects;
      }
      return data && data.length > 0 ? data : fallbackProjects;
    },
  });

  const displayProjects = projects || fallbackProjects;
  
  // Dynamic categories based on available projects
  const getAllCategories = () => {
    const projectCategories = displayProjects.map(project => project.category);
    const uniqueCategories = Array.from(new Set(projectCategories));
    return ["Semua", ...uniqueCategories];
  };
  
  const categories = getAllCategories();
  
  // Category mapping for display
  const categoryDisplayMap: { [key: string]: string } = {
    "Semua": "Semua",
    "Web Development": "🌐 Web Development",
    "Mobile App": "📱 Mobile App",
    "Web Application": "💻 Web Application"
  };

  const filteredProjects = displayProjects.filter(project => 
    selectedCategory === "Semua" || project.category === selectedCategory
  ).slice(0, 6);

  const handleProjectClick = (projectId: string) => {
    setLocation(`/project/${projectId}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gray-50" id="portfolio">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="relative group">
                <LoadingCard />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50" id="portfolio">
      
      <div className="container-responsive relative">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-badge-md font-medium-responsive shadow-xl element-spacing-sm">
            <Briefcase className="icon-mobile-sm" />
            Portfolio Showcase
          </div>
          <h2 className="text-hero-title font-bold-responsive bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent element-spacing-md leading-tight">
            Karya Digital Terbaik Kami
          </h2>
          <p className="text-hero-subtitle text-gray-700 max-w-4xl mx-auto leading-relaxed element-spacing-lg">
            Jelajahi koleksi proyek inovatif kami yang berfokus pada <strong>web development</strong> dan <strong>aplikasi mobile</strong> 
            dengan teknologi terdepan untuk solusi bisnis yang efektif dan modern
          </p>
          <PortfolioStats
            totalProjects={displayProjects?.length || 0}
            totalCategories={categories.length - 1}
            featuredProjects={displayProjects?.filter(p => p.featured === 1).length || 0}
          />
        </div>

        {/* Category Filter - Dynamic & Enhanced */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const displayName = categoryDisplayMap[category] || category;
            const projectCount = category === "Semua" 
              ? displayProjects.length 
              : displayProjects.filter(p => p.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-filter group px-4 py-2 sm:px-6 sm:py-3 rounded-2xl text-button-md font-semibold-responsive transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl tap-target relative overflow-hidden ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/25"
                    : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="flex items-center gap-2">
                  {displayName}
                  <span className={`text-xs px-2 py-1 rounded-full transition-colors ${
                    selectedCategory === category
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}>
                    {projectCount}
                  </span>
                </span>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.id}
              className="group cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Clean Image */}
              <div className="relative overflow-hidden aspect-video">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Simple Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between">
                  {project.featured === 1 && (
                    <Badge className="bg-yellow-500 text-white text-xs font-medium">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge className="bg-white text-gray-700 text-xs font-medium ml-auto">
                    {project.category}
                  </Badge>
                </div>

                {/* Clean Hover Actions */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                      <Button
                        size="sm"
                        className="portfolio-button bg-blue-500/80 backdrop-blur-sm text-white hover:bg-blue-600/80 tap-target"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.id);
                        }}
                      >
                        <Eye className="icon-mobile-sm mr-2" />
                        Detail
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="card-spacing-md">
                  <h3 className="text-card-title font-bold-responsive text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-card-description text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack && project.techStack.slice(0, 3).map((tech: string, techIndex: number) => (
                      <Badge key={techIndex} className="tech-badge bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-200 text-badge-sm">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack && project.techStack.length > 3 && (
                      <Badge className="bg-gray-100 text-gray-600 text-badge-sm">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-responsive-sm text-gray-500 mb-4">
                    <Calendar className="icon-mobile-sm" />
                    {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </div>

                  {/* Project Status */}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Aktif</span>
                    </div>
                    {project.demoUrl && (
                      <span className="flex items-center gap-1 text-blue-600">
                        <ExternalLink className="w-3 h-3" />
                        Demo Tersedia
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-2xl opacity-20 blur-xl"></div>
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-6 py-3 sm:px-8 sm:py-4 text-button-lg font-semibold-responsive rounded-2xl group tap-target"
              onClick={() => setLocation('/gallery')}
            >
              🚀 Lihat Semua Portfolio
              <ArrowRight className="icon-mobile-md ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Temukan lebih banyak proyek web development dan aplikasi mobile yang telah kami kerjakan
          </p>
        </div>
      </div>
    </section>
  );
}