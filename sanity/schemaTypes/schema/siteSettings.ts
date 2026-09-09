import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSetting",
  title: "Site Setting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: "Settings",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "secretToken",
      title: "Secret Token",
      type: "string",
    }),
  ],
});
