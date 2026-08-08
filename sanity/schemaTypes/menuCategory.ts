import { defineField, defineType } from "sanity";

export default defineType({
  name: "menuCategory",
  title: "Menü-Kategorie",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titel (italienisch)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Untertitel (deutsch)", type: "string" }),
    defineField({
      name: "group",
      title: "Bereich",
      type: "string",
      options: { list: [{ title: "Speisen", value: "speisen" }, { title: "Getränke", value: "getraenke" }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Reihenfolge", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});
