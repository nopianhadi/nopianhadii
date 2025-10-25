import { Button } from "@/components/ui/button";
import { RefreshCw, Search, FolderOpen } from "lucide-react";

interface EmptyStateProps {
  type: "no-results" | "no-projects" | "error";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  type,
  title,
  description,
  actionLabel,
  onAction,
  className = ""
}: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case "no-results":
        return <Search className="w-16 h-16 text-gray-400" />;
      case "no-projects":
        return <FolderOpen className="w-16 h-16 text-gray-400" />;
      case "error":
        return <RefreshCw className="w-16 h-16 text-red-400" />;
      default:
        return <Search className="w-16 h-16 text-gray-400" />;
    }
  };

  const getEmoji = () => {
    switch (type) {
      case "no-results":
        return "🔍";
      case "no-projects":
        return "📁";
      case "error":
        return "⚠️";
      default:
        return "🔍";
    }
  };

  return (
    <div className={`text-center py-16 ${className}`}>
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
        <div className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl p-12 shadow-2xl max-w-md mx-auto">
          <div className="text-6xl mb-6 animate-bounce">{getEmoji()}</div>
          <div className="mb-6">{getIcon()}</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>
          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 text-base font-semibold rounded-xl"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}