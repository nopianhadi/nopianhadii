import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft, Search } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 google-fade-in" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 opacity-30 google-fade-in">
        <div className="absolute top-20 right-20 w-48 h-48 bg-red-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-orange-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-4">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 rounded-3xl opacity-20 blur-xl"></div>
        
        <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-2xl overflow-hidden">
          <CardContent className="p-12 text-center">
            {/* 404 Animation */}
            <div className="mb-10">
              <div className="text-9xl sm:text-[12rem] lg:text-[14rem] font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6 animate-bounce">
                404
              </div>
              <div className="flex justify-center mb-8">
                <div className="p-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl text-white shadow-2xl animate-pulse">
                  <AlertCircle className="w-12 h-12" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 mb-10">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Halaman Tidak Ditemukan
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL salah.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={() => setLocation("/")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-8 py-4 rounded-2xl text-lg font-semibold"
              >
                <Home className="w-6 h-6 mr-3" />
                Kembali ke Beranda
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.history.back()}
                className="border-2 border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg font-semibold"
              >
                <ArrowLeft className="w-6 h-6 mr-3" />
                Halaman Sebelumnya
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                Atau coba cari halaman yang Anda butuhkan:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/gallery")}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Portfolio
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/about")}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Tentang Kami
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/contact")}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Kontak
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setLocation("/mobile-demo")}
                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  Mobile Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
