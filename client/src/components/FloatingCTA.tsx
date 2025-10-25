import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X } from 'lucide-react';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after 3 seconds of page load
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/62895406181407?text=Halo%20Hadi%20Origin%2C%20saya%20ingin%20berkonsultasi%20tentang%20project%20saya', '_blank');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-slide-in-bottom">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-2xl opacity-20 blur-xl"></div>
        
        <div className="relative bg-white/95 backdrop-blur-sm border border-green-200 rounded-2xl p-4 shadow-2xl max-w-sm">
          {/* Dismiss button */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="pr-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">Konsultasi Gratis</h4>
                <p className="text-xs text-gray-600">Diskusikan proyek Anda</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">
              Punya ide project? Mari diskusikan solusi terbaik untuk bisnis Anda!
            </p>
            
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}