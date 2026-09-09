import { defineField, defineType } from "sanity";

export default defineType({
  name: "headerSettings",
  title: "Header Settings",
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
      name: "searchPlaceholder",
      title: "Search Bar Placeholder",
      type: "string",
      initialValue: "Search products...",
    }),
    defineField({
      name: "primaryNavLinks",
      title: "Primary Navigation Links (Left Side)",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (URL / Path)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    }),
    defineField({
      name: "secondaryNavLinks",
      title: "Secondary Navigation Links (Right Side)",
      type: "array",
      of: [
        {
          type: "object",
          name: "navLink",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (URL / Path)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
    }),
    defineField({
      name: "categoriesButtonText",
      title: "Categories Button Label",
      type: "string",
      initialValue: "All Categories",
    }),
    defineField({
      name: "signInLink",
      title: "Sign In Link",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Sign in",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          initialValue: "/signin",
        }),
      ],
    }),
    defineField({
      name: "signUpLink",
      title: "Sign Up Button",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Sign up",
        }),
        defineField({
          name: "href",
          title: "URL",
          type: "string",
          initialValue: "/signup",
        }),
      ],
    }),
  ],
});
