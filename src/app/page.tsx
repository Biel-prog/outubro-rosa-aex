import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CareNetwork } from "@/components/sections/CareNetwork";
import { Hero } from "@/components/sections/Hero";
import { MythsFacts } from "@/components/sections/MythsFacts";
import { SelfExamGuide } from "@/components/sections/SelfExamGuide";
import { TimeFactor } from "@/components/sections/TimeFactor";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TimeFactor />
        <SelfExamGuide />
        <MythsFacts />
        <CareNetwork />
      </main>
      <Footer />
    </>
  );
}
