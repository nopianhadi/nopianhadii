import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Grid, List, ExternalLink, Github, Eye, Star, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@shared/schema";

export default function ProjectGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [, setLocation] = useLocation();

  // Fetch projects from database
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Fetch categories from database
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw new Error(error.message);
      return data || [];
    },
  });

  // Create categories list with "All" option
  const categories = ["All", ...(categoriesData?.map(cat => cat.name) || [])];

  // Filter projects based on search and category
  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.techStack && project.techStack.some((tech: string) => 
                           tech.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const handleProjectClick = (projectId: string) => {
    setLocation(`/project/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-background to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium mb-6">
              🎨 Portfolio Gallery
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              Project Showcase
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my collection of innovative projects spanning UI/UX design, web development, 
              mobile applications, and cutting-edge AI solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge variant="outline" className="px-4 py-2">
                {projects?.length || 0} Projects
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {categories.length - 1} Categories
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                {projects?.filter(p => p.featured === 1).length || 0} Featured
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }>
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton className="aspect-video w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Error loading projects
            </h3>
            <p className="text-muted-foreground">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }>
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className={`group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProjectClick(project.id)}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'sm:w-1/3' : 'aspect-video'
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {project.featured === 1 && (
                    <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
                  >
                    {project.category}
                  </Badge>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'sm:w-2/3 flex flex-col justify-between' : ''}`}>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack && project.techStack.slice(0, 3).map((tech: string, techIndex: number) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack && project.techStack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStack.length - 3}
                        </Badge>
                      )}
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      {new Date(project.createdAt).toLocaleDateString('id-ID', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                    {project.demoUrl && (
                      <Button variant="default" size="sm" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <Eye className="w-4 h-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" onClick={() => handleProjectClick(project.id)}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}