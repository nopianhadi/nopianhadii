import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Sparkles, TrendingUp, Clock, Star } from "lucide-react";

interface AISmartSearchProps {
  searchQuery: string;
  totalResults: number;
  processingTime?: number;
}

export default function AISmartSearch({ searchQuery, totalResults, processingTime = 0.15 }: AISmartSearchProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        // Generate smart suggestions based on query
        const allSuggestions = [
          // Tech-based
          'React Dashboard',
          'AI Analytics',
          'Vue.js Application',
          'Next.js Website',
          'Mobile App',
          'E-commerce Platform',
          // Category-based
          'Business Intelligence',
          'CRM System',
          'Admin Dashboard',
          'Landing Page',
          // Feature-based
          'Real-time Data',
          'API Integration',
          'Authentication System',
          'Payment Gateway',
          // Industry-based
          'Healthcare Solutions',
          'Finance Apps',
          'Education Platform',
          'E-commerce'
        ];

        // Filter suggestions that are similar to query
        const filtered = allSuggestions
          .filter(s => 
            s.toLowerCase().includes(searchQuery.toLowerCase()) ||
            searchQuery.toLowerCase().split(' ').some(word => s.toLowerCase().includes(word))
          )
          .slice(0, 3);

        setSuggestions(filtered.length > 0 ? filtered : allSuggestions.slice(0, 3));
        setIsAnalyzing(false);
      }, 300);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  if (!searchQuery || searchQuery.length <= 2) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mb-6"
      >
        <Card className="p-4 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg">
              <Sparkles className="w-5 h-5 text-primary-600" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-sm">AI Search Analysis</h4>
                {isAnalyzing && (
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                  <span><strong>{totalResults}</strong> hasil ditemukan</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Diproses dalam <strong>{processingTime}s</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <Star className="w-3.5 h-3.5 text-yellow-600" />
                  <span>Relevance score: <strong>92%</strong></span>
                </div>
              </div>

              {/* AI Suggestions */}
              {suggestions.length > 0 && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="text-xs text-gray-600 mb-2">Mungkin Anda mencari:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <motion.div
                        key={suggestion}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Badge
                          variant="secondary"
                          className="cursor-pointer hover:bg-primary-600 hover:text-white transition-colors"
                        >
                          {suggestion}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* AI Insight */}
              {!isAnalyzing && totalResults > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs text-gray-500 mt-3 italic"
                >
                  💡 AI Insight: Projects diurutkan berdasarkan relevansi dengan query "{searchQuery}"
                </motion.p>
              )}

              {!isAnalyzing && totalResults === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-gray-500 mt-2"
                >
                  🤔 Tidak menemukan hasil yang exact match. Coba gunakan kata kunci yang berbeda atau lihat suggestions di atas.
                </motion.p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
