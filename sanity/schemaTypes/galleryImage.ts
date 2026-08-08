import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryImage",
  title: "Galerie-Bild",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Bild",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "alt", title: "Alt-Text (Bildbeschreibung)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "caption", title: "Bildunterschrift", type: "string" }),
    defineField({ name: "order", title: "Reihenfolge", type: "number" }),
  ],
  preview: {
    select: { title: "alt", media: "image" },
  },
});
