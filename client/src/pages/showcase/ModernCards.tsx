import ModernCardShowcase from "@/components/showcase/ModernCardShowcase";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function ModernCards() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <ModernCardShowcase />
      </main>
      <Footer />
    </div>
  );
}
