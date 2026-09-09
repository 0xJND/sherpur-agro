import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Main Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Category Name",
      type: "string",
      validation: (rule) => rule.required().error("Category name is required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Category Icon",
      type: "image",
      description: "Upload SVG or PNG icon",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "metaImage",
      title: "Meta Image (SEO / Social Share)",
      type: "image",
      description: "Image displayed when sharing on social media",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "icon",
    },
  },
});
