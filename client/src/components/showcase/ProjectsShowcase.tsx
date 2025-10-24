import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExternalLink, Github, Eye, Filter, Search, ArrowUpDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";
import { NoProjectsEmptyState, NoResultsEmptyState } from "@/components/ui/empty-state";
import { DataLoadErrorState } from "@/components/ui/error-state";
import AISmartSearch from "@/components/ai/AISmartSearch";
import { LazyImage } from "@/components/LazyImage";

export default function ProjectsShowcase() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'newest' | 'featured' | 'name'>('newest');
  const { data: projects, isLoading, error, refetch } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      console.log('🔍 Fetching projects from Supabase...');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase Error:', error);
        throw new Error(error.message);
      }

      console.log('✅ Projects loaded:', data?.length || 0);
      return data || [];
    },
    retry: 2,
    retryDelay: 1000,
  });

  if (isLoading) {
    return (
      <section className="section-mobile bg-gradient-to-b from-blue-50/50 to-white animate-fade-in">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-16">
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glass-card overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-mobile bg-gradient-to-b from-blue-50/50 to-white animate-fade-in" id="projects">
        <div className="max-w-7xl mx-auto container-mobile">
          <DataLoadErrorState 
            onRetry={async () => { await refetch(); }}
            error={error as Error}
          />
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="section-mobile bg-gradient-to-b from-blue-50/50 to-white animate-fade-in" id="projects">
        <div className="max-w-7xl mx-auto container-mobile">
          <div className="text-center space-y-4 mb-12 animate-slide-up">
            <h2 className="text-mobile-2xl tracking-tight gradient-text-accent">
              Proyek Portfolio
            </h2>
          </div>
          <NoProjectsEmptyState onRefresh={async () => { await refetch(); }} />
        </div>
      </section>
    );
  }

  // Define all categories
  const allCategories = [
    "All",
    "Web Development",
    "Mobile App",
    "AI/ML",
    "Finance",
    "Healthcare",
    "E-Commerce",
    "Education",
    "Productivity",
    "Analytics",
    "Social"
  ];

  // Filter, search, and sort projects
  const filteredProjects = projects
    ?.filter(p => selectedCategory === "All" || p.category === selectedCategory)
    .filter(p => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.techStack.some(tech => tech.toLowerCase().includes(search))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'featured') {
        return b.featured - a.featured;
      }
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-blue-50/50 to-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 mb-8 sm:mb-10 md:mb-12 animate-slide-up">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight gradient-text-accent">
            Proyek Portfolio
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Lihat proyek-proyek yang telah saya kembangkan untuk berbagai industri
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
              asChild
              data-testid="button-contact-me"
            >
              <a href="/contact">Hubungi Saya</a>
            </Button>
          </div>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari proyek, teknologi, atau kategori..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
                aria-label="Search projects"
              />
            </div>
            
            {/* Sort Select */}
            <div className="flex items-center gap-2 sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Urutkan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Terbaru</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="name">Nama (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results count */}
          {(searchTerm || selectedCategory !== "All") && (
            <div className="mt-3 text-sm text-muted-foreground">
              Menampilkan <span className="font-semibold text-foreground">{filteredProjects?.length || 0}</span> dari <span className="font-semibold text-foreground">{projects?.length || 0}</span> proyek
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="ml-2 text-primary-600 hover:text-primary-700 underline"
                >
                  Reset filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* ✨ AI Smart Search Analysis */}
        {searchTerm && (
          <AISmartSearch 
            searchQuery={searchTerm} 
            totalResults={filteredProjects?.length || 0}
            processingTime={0.15 + Math.random() * 0.3}
          />
        )}

        {/* Category Filter */}
        <div className="mb-8 sm:mb-10 md:mb-12 animate-fade-in">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Filter Kategori:</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`
                  transition-all duration-300 text-[10px] sm:text-xs md:text-sm px-2 py-1 sm:px-3 sm:py-1.5
                  ${selectedCategory === category 
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg scale-105" 
                    : "glass hover:bg-blue-50 hover:border-blue-300"
                  }
                `}
              >
                {category}
                {category !== "All" && projects && (
                  <Badge variant="secondary" className="ml-1 sm:ml-2 text-[9px] sm:text-[10px] px-1 py-0">
                    {projects.filter(p => p.category === category).length}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* No projects message */}
        {filteredProjects && filteredProjects.length === 0 && (
          <div className="py-6">
            <NoResultsEmptyState onClearFilters={() => setSelectedCategory("All")} />
          </div>
        )}

        {/* Display logic: All shows flat grid, specific category shows with header */}
        {selectedCategory === "All" ? (
          // Show all projects in a single grid without category headers
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            {filteredProjects?.map((project, projectIndex) => (
              <Card
                key={project.id}
                className="glass-card-mobile overflow-hidden animate-slide-up hover:scale-105 transition-all duration-300 group cursor-pointer rounded-lg sm:rounded-xl h-full flex flex-col"
                style={{ animationDelay: `${projectIndex * 0.05}s` }}
                onClick={() => setLocation(`/project/${project.id}`)}
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  <LazyImage
                    src={project.image || ''}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-1 sm:gap-1.5 md:gap-2">
                    {project.featured === 1 && (
                      <Badge className="bg-yellow-500 text-white animate-glow text-[6px] sm:text-[7px] md:text-[9px] px-0.5 py-[1px] sm:px-1 sm:py-0.5 leading-none h-auto min-h-0">Featured</Badge>
                    )}
                    <Badge className="bg-blue-500/80 text-white glass backdrop-blur-sm text-[6px] sm:text-[7px] md:text-[9px] px-0.5 py-[1px] sm:px-1 sm:py-0.5 leading-none h-auto min-h-0">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setLocation(`/project/${project.id}`);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        Detail
                      </Button>
                      {project.demoUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                        >
                          <a 
                            href={project.demoUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="ghost"
                          asChild
                        >
                          <a 
                            href={project.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-1 sm:space-y-1.5 md:space-y-2">
                    <h4 className="text-sm sm:text-base md:text-lg font-bold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 group-hover:text-slate-600 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2 mt-3">
                    {project.techStack && project.techStack.slice(0, 4).map((tech: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-[9px] sm:text-[10px] md:text-xs glass animate-fade-in px-1.5 py-0.5 sm:px-2 sm:py-1" style={{ animationDelay: `${idx * 0.1}s` }}>
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack && project.techStack.length > 4 && (
                      <Badge variant="outline" className="text-[9px] sm:text-[10px] md:text-xs glass animate-fade-in px-1.5 py-0.5 sm:px-2 sm:py-1">
                        +{project.techStack.length - 4}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Show projects with category header for specific category
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <h3 className="text-mobile-lg gradient-text-accent">
                {selectedCategory}
              </h3>
              <Badge variant="secondary" className="glass animate-glow badge-mobile">
                {filteredProjects?.length || 0} {filteredProjects?.length === 1 ? 'project' : 'projects'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {filteredProjects?.map((project, projectIndex) => (
                <Card
                  key={project.id}
                  className="glass-card-mobile overflow-hidden animate-slide-up hover:scale-105 transition-all duration-300 group cursor-pointer"
                  style={{ animationDelay: `${projectIndex * 0.05}s` }}
                  onClick={() => setLocation(`/project/${project.id}`)}
                >
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <LazyImage
                          src={project.image || ''}
                          alt={project.title}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.featured === 1 && (
                        <Badge className="bg-yellow-500 text-white animate-glow badge-mobile">Featured</Badge>
                      )}
                      <Badge className="bg-blue-500/80 text-white glass backdrop-blur-sm badge-mobile">
                        {project.status}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation(`/project/${project.id}`);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          Detail
                        </Button>
                        {project.demoUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a 
                              href={project.demoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink className="w-4 h-4" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button
                            size="sm"
                            variant="ghost"
                            asChild
                          >
                            <a 
                              href={project.githubUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col justify-between card-mobile space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-mobile-base font-bold group-hover:text-primary transition-colors duration-300">
                          {project.title}
                        </h4>
                        <p className="text-mobile-sm text-muted-foreground line-clamp-2 group-hover:text-slate-600 transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.techStack && project.techStack.slice(0, 4).map((tech: string, idx: number) => (
                          <Badge key={idx} variant="outline" className="text-xs glass animate-fade-in badge-mobile" style={{ animationDelay: `${idx * 0.1}s` }}>
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack && project.techStack.length > 4 && (
                          <Badge variant="outline" className="text-xs glass animate-fade-in badge-mobile">
                            +{project.techStack.length - 4}
                          </Badge>
                        )}
                      </div>
                    </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
