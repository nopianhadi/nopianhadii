import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Users, Zap } from "lucide-react";

interface PortfolioStatsProps {
  totalProjects: number;
  totalCategories: number;
  featuredProjects: number;
  className?: string;
}

export default function PortfolioStats({ 
  totalProjects, 
  totalCategories, 
  featuredProjects,
  className = ""
}: PortfolioStatsProps) {
  const stats = [
    {
      icon: TrendingUp,
      label: "Total Proyek",
      value: totalProjects,
      color: "from-blue-100 to-blue-200 text-blue-700 border-blue-200",
      emoji: "🚀"
    },
    {
      icon: Zap,
      label: "Kategori",
      value: totalCategories,
      color: "from-cyan-100 to-blue-100 text-blue-700 border-blue-200",
      emoji: "🏷️"
    },
    {
      icon: Award,
      label: "Proyek Unggulan",
      value: featuredProjects,
      color: "from-blue-200 to-cyan-200 text-blue-800 border-blue-300",
      emoji: "⭐"
    },
    {
      icon: Users,
      label: "Klien Puas",
      value: "100%",
      color: "from-green-100 to-green-200 text-green-700 border-green-200",
      emoji: "😊"
    }
  ];

  return (
    <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Badge 
            key={index}
            className={`px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r ${stat.color} text-badge-md font-medium-responsive transition-all duration-300 hover:scale-105 hover:shadow-lg group cursor-default`}
          >
            <span className="flex items-center gap-2">
              <span className="text-lg group-hover:animate-bounce">{stat.emoji}</span>
              <span className="hidden sm:inline">{stat.label}:</span>
              <span className="font-semibold">{stat.value}</span>
            </span>
          </Badge>
        );
      })}
    </div>
  );
}