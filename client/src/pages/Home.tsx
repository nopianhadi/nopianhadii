import { lazy, Suspense } from "react";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/layout/Hero";
import Footer from "@/components/layout/Footer";

// Lazy load non-critical components for faster initial load
const AIBusinessSolver = lazy(() => import("@/components/ai/AIBusinessSolver"));
const VideoShowcase = lazy(() => import("@/components/showcase/VideoShowcase"));
const HowItWorks = lazy(() => import("@/components/HowItWorks"));
const Statistics = lazy(() => import("@/components/Statistics"));
const Partners = lazy(() => import("@/components/Partners"));
const Features = lazy(() => import("@/components/Features"));
const HomePortfolio = lazy(() => import("@/components/HomePortfolio"));
const Pricing = lazy(() => import("@/components/Pricing"));
const Team = lazy(() => import("@/components/Team"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Industries = lazy(() => import("@/components/Industries"));
const BackToTop = lazy(() => import("@/components/BackToTop"));
const ProgressIndicator = lazy(() => import("@/components/ProgressIndicator"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));

// Lightweight loading component
const SectionLoader = () => (
  <div className="flex justify-center py-8">
    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Helmet temporarily disabled due to React 18 SSR issue */}
      {/* <Helmet>
        <title>Hadi Origin - Portfolio Developer & AI Solutions</title>
        <meta name="description" content="Portfolio profesional developer yang mengkhususkan diri dalam pengembangan aplikasi AI, dashboard analytics, CRM, dan platform otomasi bisnis. Bangun aplikasi modern yang membentuk masa depan." />
        <meta name="keywords" content="portfolio developer, AI application, dashboard development, CRM development, business automation, React developer, TypeScript, Supabase" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hadiorigin.com/" />
        <meta property="og:title" content="Hadi Origin - Portfolio Developer & AI Solutions" />
        <meta property="og:description" content="Membantu bisnis membangun aplikasi dan dashboard profesional yang terintegrasi dengan AI. Dari analitik, CRM, hingga platform otomasi." />
        <meta property="og:image" content="https://hadiorigin.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://hadiorigin.com/" />
        <meta name="twitter:title" content="Hadi Origin - Portfolio Developer & AI Solutions" />
        <meta name="twitter:description" content="Membantu bisnis membangun aplikasi dan dashboard profesional yang terintegrasi dengan AI." />
        <meta name="twitter:image" content="https://hadiorigin.com/og-image.jpg" />
        
        <link rel="canonical" href="https://hadiorigin.com/" />
        <meta name="author" content="Hadi Origin" />
        <meta name="robots" content="index, follow" />
      </Helmet> */}
      
      <Suspense fallback={<SectionLoader />}>
        <ProgressIndicator />
      </Suspense>
      <Navigation />
      <main id="main-content">
        <Hero />
        
        {/* Critical above-the-fold content loaded immediately */}
        <Suspense fallback={<SectionLoader />}>
          <AIBusinessSolver />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <HomePortfolio />
        </Suspense>
        
        {/* Below-the-fold content lazy loaded */}
        <Suspense fallback={<SectionLoader />}>
          <Partners />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Features />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <VideoShowcase />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <HowItWorks />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Statistics />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Team />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Pricing />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <Industries />
        </Suspense>
      </main>
      <Footer />
      
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
      
      <Suspense fallback={null}>
        <FloatingCTA />
      </Suspense>

    </div>
  );
}
