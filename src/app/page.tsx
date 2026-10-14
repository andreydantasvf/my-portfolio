import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { Stack } from '@/components/sections/Stack';

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Contact />
    </main>
  );
}
