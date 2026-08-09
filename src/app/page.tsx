import { HeroCinematic } from "@/components/home/HeroCinematic";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { GoogleReviewsPanel } from "@/components/home/GoogleReviewsPanel";
import { CucinaSection } from "@/components/home/CucinaSection";
import { StorySection } from "@/components/home/StorySection";
import { AtmosphereStrip } from "@/components/home/AtmosphereStrip";
import { VisitSection } from "@/components/home/VisitSection";

export default function Home() {
  return (
    <>
      <HeroCinematic />
      <PhilosophySection />
      <GoogleReviewsPanel />
      <CucinaSection />
      <StorySection />
      <AtmosphereStrip />
      <VisitSection />
    </>
  );
}
