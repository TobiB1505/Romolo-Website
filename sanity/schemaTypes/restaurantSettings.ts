import { defineField, defineType } from "sanity";

export default defineType({
  name: "restaurantSettings",
  title: "Restaurant-Einstellungen",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "street", title: "Straße & Hausnummer", type: "string" }),
    defineField({ name: "zip", title: "PLZ", type: "string" }),
    defineField({ name: "city", title: "Ort", type: "string" }),
    defineField({ name: "phone", title: "Telefon (Anzeige)", type: "string" }),
    defineField({ name: "phoneHref", title: "Telefon (tel:-Link)", type: "string" }),
    defineField({ name: "email", title: "E-Mail", type: "string" }),
    defineField({
      name: "hours",
      title: "Öffnungszeiten",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "day", title: "Tag", type: "string" },
            { name: "hours", title: "Uhrzeiten", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "lat", title: "Breitengrad", type: "number" }),
    defineField({ name: "lng", title: "Längengrad", type: "number" }),
    defineField({ name: "instagramUrl", title: "Instagram-URL", type: "url" }),
    defineField({ name: "facebookUrl", title: "Facebook-URL", type: "url" }),
  ],
  preview: {
    select: { title: "name" },
  },
});
