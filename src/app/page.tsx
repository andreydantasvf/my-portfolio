import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { TechStack } from '@/components/sections/TechStack';
import { Footer } from '@/components/sections/Footer';
import { AboutMe } from '@/components/sections/AboutMe';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Hero />
      <AboutMe />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
