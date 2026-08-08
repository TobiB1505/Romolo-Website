import type { MenuCategory } from "@/lib/types";
import styles from "@/components/menu/MenuExperience.module.css";

export function MenuCategoryCard({ category }: { category: MenuCategory }) {
  return (
    <section className={styles.categoryCard} aria-labelledby={`${category.slug}-title`}>
      <div className={styles.categoryHeading}>
        <h3 id={`${category.slug}-title`}>
          {category.title}
          {category.subtitle && <span>{category.subtitle}</span>}
        </h3>
        <small>{String(category.items.length).padStart(2, "0")}</small>
      </div>
      <ul className={styles.dishList}>
        {category.items.map((item) => (
          <li key={item.name + item.description} className={styles.dishItem}>
            <div className={styles.dishCopy}>
              <span>{item.name}</span>
              {item.note && <sup>({item.note})</sup>}
              {item.description && <p>{item.description}</p>}
            </div>
            <span className={styles.dishLeader} aria-hidden />
            <strong>{item.price}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
