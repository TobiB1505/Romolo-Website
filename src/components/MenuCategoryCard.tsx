import type { MenuCategory } from "@/lib/types";

export function MenuCategoryCard({ category }: { category: MenuCategory }) {
  return (
    <div>
      <h3 className="font-display text-xl text-ink">
        {category.title}
        {category.subtitle && <span className="ml-2 text-sm font-sans italic text-ink-soft">{category.subtitle}</span>}
      </h3>
      <ul className="mt-4 space-y-4">
        {category.items.map((item) => (
          <li key={item.name + item.description} className="flex items-baseline gap-3">
            <div className="min-w-0">
              <span className="font-medium">{item.name}</span>
              {item.note && <sup className="ml-0.5 text-ink-soft">({item.note})</sup>}
              {item.description && <p className="text-sm text-ink-soft">{item.description}</p>}
            </div>
            <span className="flex-1 border-b border-dotted border-ink-soft/30 translate-y-[-4px]" aria-hidden />
            <span className="shrink-0 font-medium tabular-nums text-ink">{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
