import { defineField, defineType } from "sanity";

export default defineType({
  name: "weeklySpecial",
  title: "Wochenempfehlung",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Beschreibung", type: "text" }),
    defineField({ name: "price", title: "Preis", type: "string" }),
    defineField({ name: "image", title: "Bild", type: "image", options: { hotspot: true } }),
    defineField({ name: "validFrom", title: "Gültig ab", type: "date" }),
    defineField({ name: "validTo", title: "Gültig bis", type: "date" }),
  ],
  preview: {
    select: { title: "title", subtitle: "price", media: "image" },
  },
});
