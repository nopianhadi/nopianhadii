import { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  MessageSquare, 
  Code, 
  BarChart3, 
  FileText,
  Home,
  Plus,
  User,
  Key,
  ChevronRight,
  Play,
  ExternalLink,
  Filter,
  Grid3X3,
  List
} from "lucide-react";

export default function GoogleAIStudioShowcase() {
  const [activeFilter, setActiveFilter] = useState("All apps");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sidebarItems = [
    { icon: Home, label: "Home" },
    { icon: Code, label: "Build", active: true },
    { icon: MessageSquare, label: "Start" },
    { icon: FileText, label: "Gallery" },
    { icon: BarChart3, label: "Your apps" },
    { icon: User, label: "FAQ" },
  ];

  const filterCategories = [
    "All apps",
    "Nano Banana", 
    "Veo",
    "Multimedia understanding",
    "Developer quickstarts",
    "Code gen",
    "Audio and music",
    "Tools and MCP"
  ];

  const projectGallery = [
    {
      id: 1,
      title: "Chat with Maps Live",
      description: "Experience Streets and Grounding with Google Maps within AI to engage in immersive, location-based conversations and get real-time insights.",
      image: "/api/placeholder/400/300",
      category: "Multimedia understanding",
      type: "demo",
      badge: "Live",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      id: 2,
      title: "Veo Studio",
      description: "Create the next scene and get a stunning video in seconds. AI-driven video generation powered by Veo.",
      image: "/api/placeholder/400/300",
      category: "Veo",
      type: "video",
      badge: "New",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      id: 3,
      title: "Run Chase",
      description: "An arcade-style game where Gemini is your teammate for sports commentary.",
      image: "/api/placeholder/400/300",
      category: "Developer quickstarts",
      type: "game",
      badge: "Popular",
      gradient: "from-green-500/20 to-emerald-500/20"
    },
    {
      id: 4,
      title: "Netflix Audio Function Call Sandbox",
      description: "An interactive sandbox for Gemini's native audio and function calling.",
      image: "/api/placeholder/400/300",
      category: "Audio and music",
      type: "sandbox",
      badge: "Beta",
      gradient: "from-red-500/20 to-orange-500/20"
    },
    {
      id: 5,
      title: "FINANCE!",
      description: "Identify zoom into any image with this creative assistant. Real-time image analysis.",
      image: "/api/placeholder/400/300",
      category: "Code gen",
      type: "tool",
      badge: "Updated",
      gradient: "from-yellow-500/20 to-amber-500/20"
    },
    {
      id: 6,
      title: "Fit Check",
      description: "Upload a photo of yourself and an outfit to see how it looks on you, powered by Nano Banana.",
      image: "/api/placeholder/400/300",
      category: "Nano Banana",
      type: "fashion",
      badge: "Hot",
      gradient: "from-pink-500/20 to-rose-500/20"
    },
    {
      id: 7,
      title: "MetaKim",
      description: "Create and combine AI media, blending text and images for a single canvas.",
      image: "/api/placeholder/400/300",
      category: "Tools and MCP",
      type: "creative",
      badge: "Featured",
      gradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
      id: 8,
      title: "Runagrams",
      description: "Create animated text with AI-powered Gemini and get dynamic text animations.",
      image: "/api/placeholder/400/300",
      category: "Code gen",
      type: "animation",
      badge: "New",
      gradient: "from-teal-500/20 to-cyan-500/20"
    }
  ];

  const filteredProjects = activeFilter === "All apps" 
    ? projectGallery 
    : projectGallery.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Google AI Studio Layout */}
      <div className="flex">
        {/* Sidebar with Glassmorphism */}
        <div className="google-sidebar glass-card-mobile relative">
          <div className="p-4">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="google-heading text-lg">Google AI Studio</span>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    className={`google-sidebar-item ${item.active ? 'active' : ''} transition-all duration-200 hover:bg-white/10`}
                  >
                    <Icon className="google-icon" />
                    <span className="flex-1">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 glass-card">
                <Key className="w-4 h-4" />
                Get API key
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                <User className="w-4 h-4" />
                Account
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="border-b border-border p-6 glass-card-mobile">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="google-heading text-2xl mb-1">Remix and explore the gallery</h1>
                <p className="google-body text-sm">Discover AI-powered applications and creative tools</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="gap-2"
                >
                  {viewMode === "grid" ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
                  {viewMode === "grid" ? "List" : "Grid"}
                </Button>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New app
                </Button>
              </div>
            </div>
          </header>

          {/* Filter Section */}
          <section className="p-6 border-b border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="google-body text-sm font-medium">Filter by category:</span>
              </div>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary glass-card'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* Project Gallery */}
          <section className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="google-subheading text-xl">
                {activeFilter === "All apps" ? "All Applications" : activeFilter}
                <span className="text-muted-foreground text-sm ml-2">
                  ({filteredProjects.length} {filteredProjects.length === 1 ? 'app' : 'apps'})
                </span>
              </h2>
            </div>

            {/* Masonry Grid Layout */}
            <div className={`${
              viewMode === "grid" 
                ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6" 
                : "space-y-4"
            }`}>
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className={`${viewMode === "grid" ? "break-inside-avoid" : ""} group cursor-pointer`}
                >
                  <Card className="google-card-elevated glass-card hover:glass-card-mobile transition-all duration-300 overflow-hidden">
                    {/* Project Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          {project.type === "video" ? (
                            <Play className="w-6 h-6 text-white" />
                          ) : (
                            <ExternalLink className="w-6 h-6 text-white" />
                          )}
                        </div>
                      </div>
                      
                      {/* Badge */}
                      <div className="absolute top-3 right-3">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs glass-card ${
                            project.badge === "New" ? "bg-green-500/20 text-green-700" :
                            project.badge === "Hot" ? "bg-red-500/20 text-red-700" :
                            project.badge === "Popular" ? "bg-blue-500/20 text-blue-700" :
                            project.badge === "Featured" ? "bg-purple-500/20 text-purple-700" :
                            "bg-gray-500/20 text-gray-700"
                          }`}
                        >
                          {project.badge}
                        </Badge>
                      </div>
                    </div>

                    {/* Project Content */}
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <CardTitle className="google-subheading text-base group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                        <CardDescription className="google-body text-sm line-clamp-2">
                          {project.description}
                        </CardDescription>
                        
                        {/* Category Tag */}
                        <div className="flex items-center justify-between pt-2">
                          <Badge variant="outline" className="text-xs">
                            {project.category}
                          </Badge>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="google-subheading text-lg mb-2">No apps found</h3>
                <p className="google-body text-sm text-muted-foreground">
                  Try adjusting your filter or browse all apps
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveFilter("All apps")}
                >
                  Show all apps
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}