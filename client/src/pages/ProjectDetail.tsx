// import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Play,
  CheckCircle2,
  Lightbulb,
  TrendingUp,
  Calendar,
  Tag,
  Download,
  Star,
  Eye
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";
import { useState } from "react";

export default function ProjectDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const projectId = params.id;

  const { data: project, isLoading, error } = useQuery<Project>({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw new Error(error.message);
      
      console.log('📦 Project Data:', data);
      console.log('🎬 Video URL:', data?.videoUrl);
      console.log('🎬 Video URL (snake_case):', data?.video_url);
      
      return data;
    },
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          <Skeleton className="h-10 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-6 w-1/2 mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white flex items-center justify-center">
        <Card className="p-4 sm:p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Proyek Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-6">
            Maaf, proyek yang Anda cari tidak tersedia.
          </p>
          <Button onClick={() => setLocation("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <Navigation />
      
      {/* Hero Header */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 google-fade-in" />
        
        {/* Floating elements */}
        <div className="absolute inset-0 opacity-30 google-fade-in">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="google-slide-up">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/gallery")}
              className="mb-10 border-2 border-blue-200 bg-white/80 hover:bg-white text-blue-700 hover:border-blue-300 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 text-base font-semibold rounded-xl"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Kembali ke Portfolio
            </Button>
            
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <Badge className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg text-base font-semibold rounded-xl">
                    <Tag className="w-5 h-5 mr-2" />
                    {project.category}
                  </Badge>
                  {project.featured === 1 && (
                    <Badge className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg text-base font-semibold rounded-xl">
                      <Star className="w-5 h-5 mr-2" />
                      Featured Project
                    </Badge>
                  )}
                  <span className="flex items-center gap-3 text-gray-600 text-lg font-medium">
                    <Calendar className="w-5 h-5" />
                    {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'long' 
                    })}
                  </span>
                </div>
                
                <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-10 leading-tight">
                  {project.title}
                </h1>
                
                <p className="text-2xl sm:text-3xl text-gray-700 leading-relaxed max-w-5xl">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6">
                {(project.demoUrl || (project as any).demo_url) && (
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-4 rounded-2xl text-lg font-semibold">
                    <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-6 h-6 mr-3" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {(project.githubUrl || (project as any).github_url) && (
                  <Button variant="outline" asChild size="lg" className="border-2 border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg font-semibold">
                    <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-6 h-6 mr-3" />
                      Source Code
                    </a>
                  </Button>
                )}
                {(project.downloadUrl || (project as any).download_url) && (
                  <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-4 rounded-2xl text-lg font-semibold">
                    <a href={project.downloadUrl || (project as any).download_url} target="_blank" rel="noopener noreferrer" download>
                      <Download className="w-6 h-6 mr-3" />
                      Download App
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl translate-x-48 -translate-y-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl -translate-x-48 translate-y-48"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main Image */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
            <Card className="relative overflow-hidden group cursor-pointer rounded-3xl border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <img
                src={selectedImage || project.image}
                alt={project.title}
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-lg">{project.title}</h3>
                    <p className="text-white/80 text-sm">{project.category}</p>
                  </div>
                  <div className="flex gap-2">
                    {(project.demoUrl || (project as any).demo_url) && (
                      <Button size="sm" className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30" asChild>
                        <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Image Gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-medium mb-6 shadow-xl">
                  <Eye className="w-5 h-5" />
                  Galeri Proyek
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent mb-4">
                  Galeri Proyek
                </h2>
                <p className="text-xl text-gray-700">Lihat berbagai tampilan dan fitur dari proyek ini</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <Card 
                    className={`relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 rounded-2xl border-0 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm ${
                      !selectedImage ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                    }`}
                    onClick={() => setSelectedImage(null)}
                  >
                    <div className="relative group">
                      <img
                        src={project.image}
                        alt={`${project.title} - Main`}
                        className="w-full aspect-video object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">Main Image</p>
                      </div>
                    </div>
                  </Card>
                </div>
                {project.images?.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                    <Card 
                      className={`relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 rounded-2xl border-0 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm ${
                        selectedImage === img ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
                      }`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <div className="relative group">
                        <img
                          src={img}
                          alt={`${project.title} - ${idx + 1}`}
                          className="w-full aspect-video object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-sm font-medium">Screenshot {idx + 1}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Video Tutorial */}
          {(project.videoUrl || (project as any).video_url) && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full text-sm font-medium mb-6 shadow-xl">
                  <Play className="w-5 h-5" />
                  Video Demo
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Video Tutorial & Demo
                </h2>
                <p className="text-xl text-gray-700">Lihat bagaimana proyek ini bekerja dalam aksi</p>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 rounded-3xl opacity-20 blur-xl"></div>
                <Card className="relative overflow-hidden rounded-3xl border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
                  <div className="aspect-video">
                    <iframe
                      src={project.videoUrl || (project as any).video_url}
                      className="w-full h-full rounded-3xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${project.title} - Video Tutorial`}
                    />
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                <Card className="relative p-8 rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                      Tentang Proyek
                    </h2>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {project.description}
                  </p>
                  {project.fullDescription && (
                    <div className="prose prose-blue max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                        {project.fullDescription}
                      </p>
                    </div>
                  )}
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </div>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <Card className="relative p-8 rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Fitur Utama
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-green-50/80 rounded-xl border border-green-200 hover:bg-green-100/80 transition-colors duration-200">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <Card className="relative p-8 rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Lightbulb className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                        Tantangan & Solusi
                      </h2>
                    </div>
                    <div className="bg-orange-50/80 rounded-xl p-6 border border-orange-200">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                        {project.challenges}
                      </p>
                    </div>
                    
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </div>
              )}

              {/* Results */}
              {project.results && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <Card className="relative p-8 rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        Hasil & Dampak
                      </h2>
                    </div>
                    <div className="bg-emerald-50/80 rounded-xl p-6 border border-emerald-200">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                        {project.results}
                      </p>
                    </div>
                    
                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Card>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Tech Stack */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                <Card className="relative p-6 rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Tag className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                      Tech Stack
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack && project.techStack.length > 0 ? (
                      project.techStack.map((tech, idx) => (
                        <Badge key={idx} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 hover:from-purple-200 hover:to-pink-200 transition-all duration-200 px-3 py-1">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">Tidak ada informasi tech stack</p>
                    )}
                  </div>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </div>

              {/* Quick Links */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                <Card className="relative p-6 rounded-3xl border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                      Quick Links
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {(project.demoUrl || (project as any).demo_url) && (
                      <Button asChild className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl">
                        <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {(project.githubUrl || (project as any).github_url) && (
                      <Button asChild variant="outline" className="w-full justify-start border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:scale-105 rounded-xl">
                        <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Source Code
                        </a>
                      </Button>
                    )}
                    {(project.videoUrl || (project as any).video_url) && (
                      <Button asChild variant="outline" className="w-full justify-start border-2 border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50 transition-all duration-300 hover:scale-105 rounded-xl">
                        <a href={project.videoUrl || (project as any).video_url} target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4 mr-2" />
                          Watch Video
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </div>

              {/* CTA */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
                <Card className="relative p-6 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 group hover:-translate-y-2">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-sm font-medium mb-6 shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <CheckCircle2 className="w-4 h-4" />
                      Interested?
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">Tertarik dengan Proyek Ini?</h3>
                    <p className="text-base text-gray-700 mb-6 leading-relaxed">
                      Mari diskusikan bagaimana kami dapat membantu Anda membuat proyek serupa untuk bisnis Anda
                    </p>
                    <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl py-3">
                      <a href="/contact">
                        💬 Konsultasi Gratis
                      </a>
                    </Button>
                  </div>
                  
                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
