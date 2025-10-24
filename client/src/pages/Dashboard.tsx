import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import DashboardShowcase from "@/components/showcase/DashboardShowcase";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <DashboardShowcase />
      </main>
      <Footer />
    </div>
  );
}
