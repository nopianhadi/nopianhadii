import React from "react"
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import { Smartphone, Tablet, Monitor, Palette, Zap, Shield } from "lucide-react"

export default function MobileDemo() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
              🚀 Mobile UI Components
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Modern Mobile UI/UX
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Komponen UI yang dioptimalkan untuk pengalaman mobile terbaik dengan desain modern dan performa tinggi
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                <Smartphone className="w-5 h-5" />
                Lihat Demo
              </button>
              
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border bg-background hover:bg-accent text-foreground font-medium rounded-lg transition-all duration-200">
                <Monitor className="w-5 h-5" />
                Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Fitur Unggulan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Komponen yang dirancang khusus untuk pengalaman mobile yang optimal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Mobile-First Design",
                description: "Dirancang khusus untuk perangkat mobile dengan touch-friendly interactions"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Performance Optimized",
                description: "Komponen ringan dengan animasi yang smooth dan loading yang cepat"
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: "Modern Design System",
                description: "Mengikuti tren desain terkini dengan Google AI Studio inspired theme"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Accessibility Ready",
                description: "Mendukung screen reader dan keyboard navigation untuk semua pengguna"
              },
              {
                icon: <Tablet className="w-8 h-8" />,
                title: "Responsive Layout",
                description: "Tampil sempurna di semua ukuran layar dari mobile hingga desktop"
              },
              {
                icon: <Monitor className="w-8 h-8" />,
                title: "Developer Friendly",
                description: "TypeScript support dengan dokumentasi lengkap dan easy to use API"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card border border-card-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="inline-flex p-3 bg-primary/10 text-primary rounded-lg mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Cards Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Component Preview
            </h2>
            <p className="text-lg text-muted-foreground">
              Lihat beberapa contoh komponen yang tersedia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card Examples */}
            <div className="bg-card border border-card-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Mobile Card</h4>
                  <p className="text-sm text-muted-foreground">Interactive card component</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Card component yang dioptimalkan untuk mobile dengan hover effects dan responsive design.
              </p>
              <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                Explore
              </button>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Mobile Button</h4>
                  <p className="text-sm text-muted-foreground">Touch-optimized buttons</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Button dengan berbagai variant dan size yang touch-friendly untuk mobile devices.
              </p>
              <button className="w-full py-2 px-4 border border-border rounded-lg hover:bg-accent transition-colors">
                Try It
              </button>
            </div>

            <div className="bg-card border border-card-border rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Palette className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Mobile Forms</h4>
                  <p className="text-sm text-muted-foreground">Mobile-first form inputs</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Form components yang dioptimalkan untuk input mobile dengan validation dan accessibility.
              </p>
              <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all">
                Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Siap Memulai?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Mulai gunakan komponen mobile UI yang modern dan responsif untuk project Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              Get Started
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border bg-background hover:bg-accent text-foreground font-medium rounded-lg transition-all duration-200">
              View Documentation
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}