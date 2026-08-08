import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { homeContent } from "@/lib/data/restaurant";

export function PhilosophySection() {
  return (
    <section className="bg-cream py-section">
      <Container size="wide">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-2">
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span aria-hidden className="text-xs text-ink-soft/50">
                  02
                </span>
                <span className="eyebrow text-terracotta">{homeContent.philosophyEyebrow}</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-6 font-display text-display-lg italic leading-[1.1] text-ink">
                {homeContent.philosophyStatement}
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 max-w-measure text-lg leading-relaxed text-ink-soft">
                {homeContent.philosophySupport}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-8 sm:flex-row sm:items-baseline sm:justify-between lg:col-span-10 lg:col-start-2 lg:mt-20">
            <div>
              <span className="eyebrow text-gold">{homeContent.weeklyMenuEyebrow}</span>
              <p className="mt-2 max-w-md text-ink-soft">{homeContent.weeklyMenuNote}</p>
            </div>
            <Link
              href="/speisekarte"
              className="inline-flex min-h-11 items-center whitespace-nowrap text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
            >
              Zur Speisekarte →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
