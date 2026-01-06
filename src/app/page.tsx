import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectsSection from '@/components/ProjectsSection';
import RentalSection from '@/components/RentalSection';
import ClientsSection from '@/components/ClientsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <RentalSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}