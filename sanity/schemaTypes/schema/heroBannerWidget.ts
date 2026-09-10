import { defineField, defineType } from "sanity";

export const heroBannerWidget = defineType({
  name: "heroBannerWidget",
  title: "Hero Banner Widget",
  type: "object",
  fields: [
    defineField({
      name: "widgetTitle",
      title: "Widget Title (Internal Reference)",
      type: "string",
    }),
    defineField({
      name: "gridColsMobile",
      title: "Mobile Column Span (out of 12)",
      type: "number",
      initialValue: 12,
      options: { list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    }),
    defineField({
      name: "gridColsDesktop",
      title: "Desktop Column Span (out of 12)",
      type: "number",
      initialValue: 5,
      options: { list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    }),
    defineField({
      name: "topBanner",
      title: "Top Banner",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Banner Image",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "link",
          title: "Link URL",
          type: "string",
        }),
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "bottomBanners",
      title: "Bottom Banners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Banner Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "link",
              title: "Link URL",
              type: "string",
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        },
      ],
    }),
  ],
});
