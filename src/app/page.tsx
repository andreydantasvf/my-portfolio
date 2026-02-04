import { AboutMe } from '@/components/AboutMe';
import { ContactMe } from '@/components/ContactMe';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomeSection } from '@/components/HomeSection';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-16 2xl:mt-28">
        <HomeSection />
        <AboutMe />
        <Skills />
        <Projects />
        <ContactMe />
      </main>
      <Footer />
    </>
  );
}
