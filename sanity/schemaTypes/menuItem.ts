import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuItem",
  title: "Gericht / Getränk",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Beschreibung", type: "string" }),
    defineField({ name: "price", title: "Preis", type: "string", validation: (r) => r.required() }),
    defineField({ name: "note", title: "Allergen-/Zusatzstoff-Kennzeichnung", type: "string", description: "z. B. 2,3" }),
    defineField({ name: "order", title: "Reihenfolge", type: "number" }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "reference",
      to: [{ type: "menuCategory" }],
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
