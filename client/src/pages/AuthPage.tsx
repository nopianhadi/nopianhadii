import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  // Redirect if already logged in
  if (user) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      loginMutation.mutate({ email, password });
    } else {
      registerMutation.mutate({ email, password, username });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 google-fade-in" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 opacity-30 google-fade-in">
        <div className="absolute top-20 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
          
          <Card className="relative bg-white/80 backdrop-blur-sm border-0 rounded-3xl shadow-2xl p-8">
            <div className="space-y-6">
              <div className="space-y-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-3xl">HO</span>
                  </div>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 bg-clip-text text-transparent">
                  {isLogin ? "Admin Login" : "Admin Register"}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-md mx-auto">
                  {isLogin 
                    ? "Masukkan kredensial untuk mengakses dashboard admin portfolio" 
                    : "Buat akun admin baru untuk mengelola portfolio dan proyek"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-semibold text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    required
                    disabled={isPending}
                    data-testid="input-email"
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                {!isLogin && (
                  <div className="space-y-3">
                    <Label htmlFor="username" className="text-base font-semibold text-gray-700">Username (Opsional)</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      disabled={isPending}
                      data-testid="input-username"
                      className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/50 backdrop-blur-sm"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base font-semibold text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isPending}
                    data-testid="input-password"
                    className="h-12 text-base border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl text-base font-semibold"
                  disabled={isPending}
                  data-testid="button-submit"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {isLogin ? "Masuk..." : "Mendaftar..."}
                    </>
                  ) : (
                    isLogin ? "Masuk ke Dashboard" : "Buat Akun Admin"
                  )}
                </Button>
              </form>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors"
                  data-testid="button-toggle-mode"
                >
                  {isLogin 
                    ? "Belum punya akun? Daftar di sini" 
                    : "Sudah punya akun? Masuk di sini"}
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="hidden lg:flex items-center justify-center p-8 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600"></div>
        
        {/* Floating elements for right side */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-20 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative z-10 max-w-md text-white space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Dashboard Admin Portfolio
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Kelola semua proyek portfolio Anda dengan mudah. Tambah, edit, dan hapus proyek dari satu dashboard yang intuitif dan modern.
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { icon: "🎨", text: "Manajemen proyek yang mudah dan intuitif" },
              { icon: "📸", text: "Upload gambar dan link demo dengan drag & drop" },
              { icon: "🏷️", text: "Organisasi berdasarkan kategori dan tag" },
              { icon: "📊", text: "Analytics dan statistik portfolio" },
              { icon: "🚀", text: "Deploy dan publish dengan satu klik" }
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl">{feature.icon}</div>
                <span className="text-white/90 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/20">
            <p className="text-sm text-blue-200">
              Powered by modern web technologies untuk performa optimal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
