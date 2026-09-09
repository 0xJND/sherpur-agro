import { defineField, defineType } from "sanity";

export default defineType({
  name: "subCategory",
  title: "Sub-Category",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Sub-Category Name",
      type: "string",
      validation: (rule) =>
        rule.required().error("Sub-category name is required"),
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
      name: "parentCategory",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "category" }], // মেইন ক্যাটাগরিকে লিঙ্ক করছে
      validation: (rule) =>
        rule.required().error("Please select a main category"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Sub-Category Icon",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "metaImage",
      title: "Meta Image (SEO / Social Share)",
      type: "image",
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
      subtitle: "parentCategory.name",
      media: "icon",
    },
  },
});
