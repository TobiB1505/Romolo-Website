import { Container } from "./Container";

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-forest py-20 text-cream">
      <Container>
        <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-xl text-cream/80">{subtitle}</p>}
      </Container>
    </div>
  );
}
