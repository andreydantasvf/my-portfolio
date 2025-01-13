import { AboutMe } from '@/components/AboutMe';
import { ContactMe } from '@/components/ContactMe';
import { Header } from '@/components/Header';
import { HomeSection } from '@/components/HomeSection';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';

export default function Home() {
  return (
    <>
      <Header />
      <main className="h-screen 2xl:h-[620px] 2xl:mt-28 max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto">
        <HomeSection />
        <AboutMe />
        <Skills />
        <Projects />
        <ContactMe />
      </main>
    </>
  );
}
