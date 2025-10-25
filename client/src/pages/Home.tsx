// import { Helmet } from "react-helmet-async";
import Navigation from "@/components/layout/Navigation";
import Hero from "@/components/layout/Hero";
import AIBusinessSolver from "@/components/ai/AIBusinessSolver";
import AIChatbot from "@/components/ai/AIChatbot";
import VideoShowcase from "@/components/showcase/VideoShowcase";
import HowItWorks from "@/components/HowItWorks";
import Statistics from "@/components/Statistics";
import Partners from "@/components/Partners";
import Features from "@/components/Features";
import HomePortfolio from "@/components/HomePortfolio";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Industries from "@/components/Industries";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/BackToTop";
import ProgressIndicator from "@/components/ProgressIndicator";
import FloatingCTA from "@/components/FloatingCTA";

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
      
      <ProgressIndicator />
      <Navigation />
      <main id="main-content">
        <Hero />
        {/* ✨ AI Business Problem Solver - Client Input */}
        <AIBusinessSolver />
        <HomePortfolio />
        <Partners />
        <Features />
        <VideoShowcase />
        <HowItWorks />
        <Statistics />
        <Team />
        <Testimonials />
        <Pricing />
        <Industries />
      </main>
      <Footer />
      <BackToTop />
      <FloatingCTA />
      {/* ✨ AI Chatbot Assistant - Floating */}
      <AIChatbot />
    </div>
  );
}
