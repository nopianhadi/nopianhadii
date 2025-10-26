// Referenced from blueprint:javascript_auth_all_persistance
import { Switch, Route } from "wouter";
// import { HelmetProvider } from "react-helmet-async";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ApiConfigProvider } from "@/hooks/use-api-config";
import { ProtectedRoute } from "@/lib/protected-route";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

// Lazy load components for better performance
const Admin = lazy(() => import("@/pages/Admin"));
const AuthPage = lazy(() => import("@/pages/AuthPage"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const FramerLanding = lazy(() => import("@/pages/FramerLanding"));
const ModernCards = lazy(() => import("@/pages/ModernCards"));
const ProductLanding = lazy(() => import("@/pages/ProductLanding"));
const GoogleAIStudio = lazy(() => import("@/pages/GoogleAIStudio"));
const MobileDemo = lazy(() => import("@/pages/MobileDemo"));
const ProjectGallery = lazy(() => import("@/pages/ProjectGallery"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="text-sm text-muted-foreground">Loading...</p>
    </div>
  </div>
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth">
        <Suspense fallback={<PageLoader />}>
          <AuthPage />
        </Suspense>
      </Route>
      <Route path="/about">
        <Suspense fallback={<PageLoader />}>
          <About />
        </Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<PageLoader />}>
          <Contact />
        </Suspense>
      </Route>
      <Route path="/landing">
        <Suspense fallback={<PageLoader />}>
          <LandingPage />
        </Suspense>
      </Route>
      <Route path="/framer">
        <Suspense fallback={<PageLoader />}>
          <FramerLanding />
        </Suspense>
      </Route>
      <Route path="/dashboard">
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      </Route>
      <Route path="/modern-cards">
        <Suspense fallback={<PageLoader />}>
          <ModernCards />
        </Suspense>
      </Route>
      <Route path="/product">
        <Suspense fallback={<PageLoader />}>
          <ProductLanding />
        </Suspense>
      </Route>
      <Route path="/google-ai-studio">
        <Suspense fallback={<PageLoader />}>
          <GoogleAIStudio />
        </Suspense>
      </Route>
      <Route path="/mobile-showcase">
        <Suspense fallback={<PageLoader />}>
          <MobileDemo />
        </Suspense>
      </Route>
      <Route path="/gallery">
        <Suspense fallback={<PageLoader />}>
          <ProjectGallery />
        </Suspense>
      </Route>
      <Route path="/project/:id">
        <Suspense fallback={<PageLoader />}>
          <ProjectDetail />
        </Suspense>
      </Route>
      <Route path="/admin">
        <Suspense fallback={<PageLoader />}>
          <ProtectedRoute component={Admin} />
        </Suspense>
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ApiConfigProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ApiConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
