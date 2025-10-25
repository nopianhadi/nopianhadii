import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import PortfolioStats from "@/components/PortfolioStats";
import OptimizedImage from "@/components/OptimizedImage";
import { ExternalLink, Eye, Star, Calendar, Briefcase, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";

// Fallback projects untuk demo
const fallbackProjects = [
  {
    id: "1",
    title: "Platform E-Commerce Modern",
    description: "Solusi e-commerce lengkap dengan sistem pembayaran terintegrasi dan dashboard analytics.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    category: "Web Development",
    techStack: ["React", "Next.js", "TypeScript", "Stripe"],
    demoUrl: "https://demo-ecommerce.com",
    featured: 1,
    status: "active",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    title: "Aplikasi Delivery Mobile",
    description: "Aplikasi mobile untuk layanan delivery dengan real-time tracking GPS.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Firebase", "Google Maps"],
    demoUrl: "https://demo-delivery.com",
    featured: 1,
    status: "active",
    createdAt: "2024-02-10"
  },
  {
    id: "3",
    title: "Website Corporate",
    description: "Website company profile dengan desain modern dan optimasi SEO.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Web Development",
    techStack: ["React", "TypeScript", "Next.js"],
    demoUrl: "https://demo-corporate.com",
    featured: 0,
    status: "active",
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    title: "Sistem Manajemen Bisnis",
    description: "Platform manajemen bisnis terintegrasi dengan fitur CRM dan analytics.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Node.js", "PostgreSQL"],
    demoUrl: "https://demo-business.com",
    featured: 0,
    status: "active",
    createdAt: "2024-03-05"
  },
  {
    id: "5",
    title: "Platform E-Learning",
    description: "Sistem pembelajaran online dengan video streaming dan quiz interaktif.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
    category: "Web Application",
    techStack: ["React", "Next.js", "AWS S3"],
    demoUrl: "https://demo-learning.com",
    featured: 1,
    status: "active",
    createdAt: "2024-02-28"
  },
  {
    id: "6",
    title: "Aplikasi Fintech",
    description: "Aplikasi keuangan digital dengan fitur transfer dan wallet digital.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    category: "Mobile App",
    techStack: ["React Native", "Node.js", "PostgreSQL"],
    demoUrl: "https://demo-fintech.com",
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
  
  // Dynamic categories
  const getAllCategories = () => {
    const projectCategories = displayProjects.map(project => project.category);
    const uniqueCategories = Array.from(new Set(projectCategories));
    return ["Semua", ...uniqueCategories];
  };
  
  const categories = getAllCategories();
  
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
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-xl h-80 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50" id="portfolio">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium mb-8 shadow-lg">
            <Briefcase className="w-5 h-5" />
            Portfolio Showcase
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Karya Digital Terbaik Kami
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Jelajahi koleksi proyek inovatif kami yang berfokus pada web development dan aplikasi mobile 
            dengan teknologi terdepan untuk solusi bisnis yang efektif dan modern
          </p>
          <PortfolioStats
            totalProjects={displayProjects?.length || 0}
            totalCategories={categories.length - 1}
            featuredProjects={displayProjects?.filter(p => p.featured === 1).length || 0}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const projectCount = category === "Semua" 
              ? displayProjects.length 
              : displayProjects.filter(p => p.category === category).length;
            
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="flex items-center gap-2">
                  {category}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {projectCount}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id}
              className="group cursor-pointer border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              onClick={() => handleProjectClick(project.id)}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
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

                {/* Hover Actions */}
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
                      className="bg-blue-600 text-white hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project.id);
                      }}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack && project.techStack.slice(0, 3).map((tech: string) => (
                    <Badge key={tech} className="bg-gray-100 text-gray-700 text-xs font-normal border-0">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack && project.techStack.length > 3 && (
                    <Badge className="bg-gray-100 text-gray-500 text-xs font-normal border-0">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(project.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </div>
                  {project.demoUrl && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <ExternalLink className="w-3 h-3" />
                      Live Demo
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 rounded-xl"
            onClick={() => setLocation('/gallery')}
          >
            <span>Lihat Semua Portfolio</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}