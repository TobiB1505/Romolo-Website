import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { homeContent } from "@/lib/data/restaurant";
import { findGalleryImage } from "@/lib/data/gallery";

const storyImage = findGalleryImage("interior-4");

export function StorySection() {
  return (
    <section className="overflow-hidden bg-cream py-section">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-baseline gap-3">
                <span aria-hidden className="text-xs text-ink-soft/50">
                  04
                </span>
                <span className="eyebrow text-terracotta">{homeContent.storyEyebrow}</span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-display-lg text-ink">{homeContent.storyHeadline}</h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-measure leading-relaxed text-ink-soft">{homeContent.storyText}</p>
            </Reveal>
            <Reveal delay={0.22}>
              <Link
                href="/ueber-uns"
                className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
              >
                Mehr über uns erfahren →
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-image sm:aspect-[16/10] lg:aspect-[4/3]">
              <Image
                src={storyImage.src}
                alt={storyImage.alt}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
