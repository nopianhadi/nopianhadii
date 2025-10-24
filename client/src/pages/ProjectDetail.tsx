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
  Download
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white animate-fade-in">
      <Navigation />
      {/* Helmet temporarily disabled due to React 18 SSR issue */}
      {/* <Helmet>
        <title>{project.title} | Hadi Origin Portfolio</title>
        <meta name="description" content={project.description || `Detail proyek ${project.title} - ${project.category}`} />
        <meta name="keywords" content={`${project.techStack.join(', ')}, ${project.category}, project portfolio`} />
        
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://hadiorigin.com/project/${project.id}`} />
        <meta property="og:title" content={`${project.title} | Hadi Origin Portfolio`} />
        <meta property="og:description" content={project.description || `Detail proyek ${project.title}`} />
        <meta property="og:image" content={project.image} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://hadiorigin.com/project/${project.id}`} />
        <meta name="twitter:title" content={`${project.title} | Hadi Origin Portfolio`} />
        <meta name="twitter:description" content={project.description || `Detail proyek ${project.title}`} />
        <meta name="twitter:image" content={project.image} />
        
        <link rel="canonical" href={`https://hadiorigin.com/project/${project.id}`} />
      </Helmet> */}
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6">
          <Button 
            variant="ghost" 
            onClick={() => setLocation("/")}
            className="mb-4 hover:bg-blue-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3 md:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3">
                <Badge variant="secondary" className="glass">
                  <Tag className="w-3 h-3 mr-1" />
                  {project.category}
                </Badge>
                {project.featured === 1 && (
                  <Badge className="bg-yellow-500 text-white">
                    ⭐ Featured
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {(project.demoUrl || (project as any).demo_url) && (
                <Button asChild className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              {(project.githubUrl || (project as any).github_url) && (
                <Button variant="outline" asChild className="glass hover:bg-white/20">
                  <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </a>
                </Button>
              )}
              {(project.downloadUrl || (project as any).download_url) && (
                <Button asChild className="bg-green-600 text-white hover:bg-green-700 shadow-lg hover:shadow-xl transition-all duration-300">
                  <a href={project.downloadUrl || (project as any).download_url} target="_blank" rel="noopener noreferrer" download>
                    <Download className="w-4 h-4 mr-2" />
                    Download App
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        {/* Main Image */}
        <div className="mb-12">
          <Card className="glass-card overflow-hidden group cursor-pointer">
            <img
              src={selectedImage || project.image}
              alt={project.title}
              className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Card>
        </div>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Galeri Proyek</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
              <Card 
                className={`glass-card overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ${
                  !selectedImage ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImage(null)}
              >
                <img
                  src={project.image}
                  alt={`${project.title} - Main`}
                  className="w-full aspect-video object-cover"
                />
              </Card>
              {project.images?.map((img, idx) => (
                <Card 
                  key={idx}
                  className={`glass-card overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 ${
                    selectedImage === img ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`${project.title} - ${idx + 1}`}
                    className="w-full aspect-video object-cover"
                  />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Video Tutorial */}
        {(project.videoUrl || (project as any).video_url) && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Play className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold">Video Tutorial & Demo</h2>
            </div>
            <Card className="glass-card overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={project.videoUrl || (project as any).video_url}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${project.title} - Video Tutorial`}
                />
              </div>
            </Card>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card className="glass-card p-4 sm:p-6 md:p-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-blue-600" />
                Tentang Proyek
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              {project.fullDescription && (
                <div className="prose prose-blue max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {project.fullDescription}
                  </p>
                </div>
              )}
            </Card>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <Card className="glass-card p-4 sm:p-6 md:p-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  Fitur Utama
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {project.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Challenges */}
            {project.challenges && (
              <Card className="glass-card p-8 bg-gradient-to-br from-orange-50 to-white">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-orange-600" />
                  Tantangan & Solusi
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {project.challenges}
                </p>
              </Card>
            )}

            {/* Results */}
            {project.results && (
              <Card className="glass-card p-8 bg-gradient-to-br from-green-50 to-white">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  Hasil & Dampak
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {project.results}
                </p>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className="glass-card p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Teknologi yang Digunakan</h3>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                {project.techStack && project.techStack.length > 0 ? (
                  project.techStack.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="glass">
                      {tech}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Tidak ada informasi tech stack</p>
                )}
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="glass-card p-3 sm:p-4 md:p-6">
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">Quick Links</h3>
              <div className="space-y-2 sm:space-y-3">
                {(project.demoUrl || (project as any).demo_url) && (
                  <Button asChild variant="outline" className="w-full justify-start glass">
                    <a href={project.demoUrl || (project as any).demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {(project.githubUrl || (project as any).github_url) && (
                  <Button asChild variant="outline" className="w-full justify-start glass">
                    <a href={project.githubUrl || (project as any).github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </a>
                  </Button>
                )}
                {(project.videoUrl || (project as any).video_url) && (
                  <Button asChild variant="outline" className="w-full justify-start glass">
                    <a href={project.videoUrl || (project as any).video_url} target="_blank" rel="noopener noreferrer">
                      <Play className="w-4 h-4 mr-2" />
                      Watch Video
                    </a>
                  </Button>
                )}
              </div>
            </Card>

            {/* CTA */}
            <Card className="glass-card p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
              <h3 className="text-xl font-bold mb-2">Tertarik dengan Proyek Ini?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hubungi saya untuk diskusi lebih lanjut tentang proyek serupa untuk bisnis Anda.
              </p>
              <Button asChild className="w-full glass hover:bg-blue-500/20 animate-glow">
                <a href="/#contact">
                  Hubungi Saya
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
