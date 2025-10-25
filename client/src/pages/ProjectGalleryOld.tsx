import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PortfolioStats from "@/components/PortfolioStats";
import EmptyState from "@/components/EmptyState";
import OptimizedImage from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Grid, ExternalLink, Eye, Star, Calendar, Code, Smartphone, Globe, Database, Zap, Users, ShoppingCart, BookOpen, Heart, Camera, Music, GamepadIcon, Briefcase, MapPin, Award, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";

// Fallback projects untuk demo - sama dengan HomePortfolioOld
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
    createdAt: "2024-01-15",
    icon: ShoppingCart
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
    createdAt: "2024-02-10",
    icon: Smartphone
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
    createdAt: "2024-01-20",
    icon: Globe
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
    createdAt: "2024-03-05",
    icon: Briefcase
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
    createdAt: "2024-02-28",
    icon: BookOpen
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
    createdAt: "2024-01-30",
    icon: Zap
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
    createdAt: "2024-03-15",
    icon: Database
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
    createdAt: "2024-04-01",
    icon: Database
  },
  {
    id: "9",
    title: "Platform Social Media",
    description: "Platform media sosial dengan fitur posting, stories, live streaming, dan sistem notifikasi real-time untuk membangun komunitas yang aktif dan engaged.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Socket.io", "Redis", "AWS S3", "WebRTC", "MongoDB"],
    demoUrl: "https://demo-social.com",
    githubUrl: "https://github.com/demo/social",
    featured: 0,
    status: "active",
    createdAt: "2024-03-20",
    icon: Users
  },
  {
    id: "10",
    title: "Aplikasi Dating & Networking",
    description: "Aplikasi mobile untuk dating dan networking profesional dengan algoritma matching yang canggih, video call terintegrasi, dan sistem verifikasi profil.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Firebase", "ML Kit", "WebRTC", "Stripe", "Socket.io"],
    demoUrl: "https://demo-dating.com",
    githubUrl: "https://github.com/demo/dating",
    featured: 0,
    status: "active",
    createdAt: "2024-02-15",
    icon: Heart
  },
  {
    id: "11",
    title: "Portfolio Photographer",
    description: "Website portfolio untuk fotografer dengan galeri interaktif, booking system, payment gateway, dan client portal untuk review dan approval foto.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop",
    category: "Web Development",
    techStack: ["React", "Next.js", "Sanity CMS", "Stripe", "Cloudinary", "Framer Motion"],
    demoUrl: "https://demo-photo.com",
    githubUrl: "https://github.com/demo/photo",
    featured: 0,
    status: "active",
    createdAt: "2024-01-25",
    icon: Camera
  },
  {
    id: "12",
    title: "Aplikasi Music Streaming",
    description: "Platform streaming musik dengan fitur playlist, offline download, rekomendasi berbasis AI, dan sistem royalty untuk artist dengan analytics yang komprehensif.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Node.js", "MongoDB", "AWS S3", "ML/AI", "Stripe"],
    demoUrl: "https://demo-music.com",
    githubUrl: "https://github.com/demo/music",
    featured: 1,
    status: "active",
    createdAt: "2024-03-10",
    icon: Music
  },
  {
    id: "13",
    title: "Platform Gaming Community",
    description: "Platform komunitas gaming dengan tournament system, leaderboard, live chat untuk gamers, streaming integration, dan marketplace untuk gaming items.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Socket.io", "PostgreSQL", "Redis", "WebRTC", "Stripe"],
    demoUrl: "https://demo-gaming.com",
    githubUrl: "https://github.com/demo/gaming",
    featured: 0,
    status: "active",
    createdAt: "2024-02-20",
    icon: GamepadIcon
  },
  {
    id: "14",
    title: "Aplikasi Travel & Tourism",
    description: "Aplikasi mobile untuk travel planning dengan booking hotel, tiket pesawat, panduan wisata lokal, currency converter, dan offline maps untuk traveler.",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Google Maps", "Stripe", "Firebase", "ML/AI", "Offline Storage"],
    demoUrl: "https://demo-travel.com",
    githubUrl: "https://github.com/demo/travel",
    featured: 0,
    status: "active",
    createdAt: "2024-01-10",
    icon: MapPin
  },
  {
    id: "15",
    title: "Website Restaurant & Food Delivery",
    description: "Website restaurant dengan online ordering, delivery tracking, sistem reservasi meja, loyalty program, dan integration dengan POS system untuk operasional yang seamless.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    category: "Web Development",
    techStack: ["React", "Next.js", "Stripe", "Google Maps", "Socket.io", "PostgreSQL"],
    demoUrl: "https://demo-restaurant.com",
    githubUrl: "https://github.com/demo/restaurant",
    featured: 0,
    status: "active",
    createdAt: "2024-03-25",
    icon: ShoppingCart
  },
  {
    id: "16",
    title: "Platform Freelancer Marketplace",
    description: "Marketplace untuk freelancer dengan sistem bidding, escrow payment, rating system, project management tools, dan dispute resolution untuk keamanan transaksi.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Node.js", "PostgreSQL", "Stripe", "Socket.io", "AWS S3"],
    demoUrl: "https://demo-freelancer.com",
    githubUrl: "https://github.com/demo/freelancer",
    featured: 1,
    status: "active",
    createdAt: "2024-04-05",
    icon: Users
  },
  {
    id: "17",
    title: "Aplikasi Fitness & Health Tracking",
    description: "Aplikasi mobile untuk tracking fitness dengan workout plans, nutrition tracking, progress analytics, social features, dan integration dengan wearable devices.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "HealthKit", "Firebase", "Chart.js", "ML/AI", "Wearable SDK"],
    demoUrl: "https://demo-fitness.com",
    githubUrl: "https://github.com/demo/fitness",
    featured: 0,
    status: "active",
    createdAt: "2024-02-05",
    icon: Zap
  },
  {
    id: "18",
    title: "Platform Real Estate",
    description: "Platform properti dengan virtual tour, mortgage calculator, sistem CRM untuk agen, lead management, dan integration dengan MLS untuk data properti yang akurat.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Next.js", "PostgreSQL", "Google Maps", "WebRTC", "Stripe"],
    demoUrl: "https://demo-realestate.com",
    githubUrl: "https://github.com/demo/realestate",
    featured: 0,
    status: "active",
    createdAt: "2024-01-05",
    icon: MapPin
  }
];

// Helper function to add icons to projects
const addIconsToProjects = (projects: any[]) => {
  return projects.map(project => ({
    ...project,
    icon: project.category === "Web Development" ? Globe :
          project.category === "Mobile App" ? Smartphone :
          project.category === "Web Application" ? Database :
          Code
  }));
};

export default function ProjectGalleryOld() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch projects from database
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return addIconsToProjects(fallbackProjects);
      }
      return data && data.length > 0 ? addIconsToProjects(data) : addIconsToProjects(fallbackProjects);
    },
  });

  const displayProjects = projects || addIconsToProjects(fallbackProjects);

  const handleProjectClick = (projectId: string) => {
    setLocation(`/project/${projectId}`);
  };

  const featuredProjects = displayProjects.filter(project => project.featured === 1);
  const categories = ["All", ...Array.from(new Set(displayProjects.map(p => p.category)))];
  const filteredProjects = selectedCategory === "All" 
    ? displayProjects 
    : displayProjects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section - Google AI Studio Style */}
      <section className="section-spacing-lg bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative z-10">
          <div className="max-w-5xl mx-auto text-center google-fade-in">
            <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm sm:text-base font-medium mb-6 sm:mb-8 shadow-lg">
              <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
              Portfolio Gallery
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-6 sm:mb-8 leading-tight tracking-tight">
              Galeri Portfolio
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Jelajahi koleksi lengkap proyek inovatif kami yang berfokus pada web development, 
              aplikasi mobile, dan solusi digital terdepan untuk berbagai kebutuhan bisnis. 
              Setiap proyek menggabungkan teknologi terdepan dengan desain yang user-centric 
              untuk menghasilkan solusi yang tidak hanya fungsional, tetapi juga memberikan 
              pengalaman pengguna yang luar biasa.
            </p>
            
            <PortfolioStats
              totalProjects={displayProjects?.length || 0}
              totalCategories={categories.length - 1}
              featuredProjects={featuredProjects?.length || 0}
            />

            {/* Additional Hero Content */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto mt-12">
              {[
                {
                  icon: TrendingUp,
                  title: "Teknologi Terdepan",
                  description: "Menggunakan React, Next.js, React Native, dan teknologi modern lainnya untuk hasil yang optimal",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  icon: Award,
                  title: "Kualitas Premium",
                  description: "Setiap proyek dikerjakan dengan standar industri tertinggi dan best practices",
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  icon: Clock,
                  title: "Pengalaman 5+ Tahun",
                  description: "Tim berpengalaman dengan track record yang terbukti di berbagai industri",
                  gradient: "from-green-500 to-emerald-500"
                }
              ].map((feature, index) => (
                <div key={index} className="portfolio-card text-center google-fade-in" style={{ animationDelay: `${(index + 3) * 0.1}s` }}>
                  <div className={`inline-flex p-3 bg-gradient-to-r ${feature.gradient} rounded-xl shadow-lg mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="section-spacing-lg bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
          
          <div className="container-responsive relative">
            <div className="text-center mb-12 sm:mb-16 google-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full text-sm font-medium mb-6 sm:mb-8 shadow-lg">
                <Star className="w-4 h-4 sm:w-5 sm:h-5" />
                Featured Projects
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
                Proyek Unggulan
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Proyek-proyek terbaik yang menunjukkan keahlian dan inovasi kami
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="portfolio-card cursor-pointer google-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  {/* Project Image */}
                  <div className="portfolio-image relative aspect-video">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Featured Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-background/90 backdrop-blur-sm text-foreground shadow-lg">
                        <project.icon className="w-3 h-3 mr-1" />
                        {project.category}
                      </Badge>
                    </div>

                    {/* Hover Actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2 sm:gap-3">
                        {project.demoUrl && (
                          <Button
                            size="sm"
                            className="portfolio-button secondary"
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1 sm:mr-2" />
                              <span className="hidden sm:inline">Demo</span>
                            </a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          className="portfolio-button primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProjectClick(project.id);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Detail</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4 sm:p-6">
                    <h3 className="portfolio-title text-lg sm:text-xl mb-2 sm:mb-3">
                      {project.title}
                    </h3>
                    <p className="portfolio-description mb-3 sm:mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {project.techStack.slice(0, 3).map((tech: string) => (
                        <Badge key={tech} className="tech-badge">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge className="tech-badge secondary">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                          year: 'numeric', 
                          month: 'short' 
                        })}
                      </div>
                      {project.demoUrl && (
                        <span className="flex items-center gap-1 text-primary">
                          <ExternalLink className="w-3 h-3" />
                          <span className="hidden sm:inline">Live Demo</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="section-spacing-lg bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="container-responsive relative">
          <div className="text-center mb-12 sm:mb-16 google-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-6 sm:mb-8 shadow-lg">
              <Code className="w-4 h-4 sm:w-5 sm:h-5" />
              All Projects
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight tracking-tight">
              Semua Proyek
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12">
              Koleksi lengkap proyek yang telah kami kerjakan dengan berbagai teknologi dan industri
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 google-fade-in">
            {categories.map((category) => {
              const categoryCount = category === "All" 
                ? displayProjects.length 
                : displayProjects.filter(p => p.category === category).length;
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-background text-foreground border border-border hover:bg-accent hover:text-accent-foreground hover:scale-105"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{category}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      selectedCategory === category
                        ? "bg-white/20 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {categoryCount}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="text-center mb-8 google-fade-in">
            <p className="text-sm sm:text-base text-muted-foreground">
              Menampilkan <span className="font-medium text-primary">{filteredProjects.length}</span> proyek
              {selectedCategory !== "All" && (
                <span> dalam kategori <span className="font-medium text-primary">{selectedCategory}</span></span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="portfolio-card cursor-pointer google-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleProjectClick(project.id)}
              >
                {/* Project Image */}
                <div className="portfolio-image relative aspect-video">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Featured Badge */}
                  {project.featured === 1 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-background/90 backdrop-blur-sm text-foreground shadow-lg">
                      <project.icon className="w-3 h-3 mr-1" />
                      {project.category}
                    </Badge>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2 sm:gap-3">
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          className="portfolio-button secondary"
                          asChild
                          onClick={(e) => e.stopPropagation()}
                        >
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-1 sm:mr-2" />
                            <span className="hidden sm:inline">Demo</span>
                          </a>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="portfolio-button primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project.id);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Detail</span>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="portfolio-title text-lg sm:text-xl mb-2 sm:mb-3">
                    {project.title}
                  </h3>
                  <p className="portfolio-description mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {project.techStack.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} className="tech-badge">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 3 && (
                      <Badge className="tech-badge secondary">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'short' 
                      })}
                    </div>
                    {project.demoUrl && (
                      <span className="flex items-center gap-1 text-primary">
                        <ExternalLink className="w-3 h-3" />
                        <span className="hidden sm:inline">Live Demo</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}