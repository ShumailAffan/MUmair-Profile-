import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Standing } from "@/components/sections/Standing";
import { PracticeAreas } from "@/components/sections/PracticeAreas";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Standing />
        <PracticeAreas />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
