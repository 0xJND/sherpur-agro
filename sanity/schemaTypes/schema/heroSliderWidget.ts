import { defineType, defineField } from "sanity";

export const heroSliderWidget = defineType({
  name: "heroSliderWidget",
  title: "Hero Slider Widget",
  type: "object",
  fields: [
    defineField({
      name: "widgetTitle",
      title: "Widget Title (Internal Reference)",
      type: "string",
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        {
          type: "object",
          name: "slideItem",
          title: "Slide Item",
          fields: [
            defineField({
              name: "backgroundImage",
              title: "Background Image",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slideLink",
              title: "Slide URL (Optional)",
              type: "string",
            }),
            defineField({
              name: "contentType",
              title: "Content Display Type",
              type: "string",
              options: {
                list: [
                  { title: "No Content (Only Background)", value: "none" },
                  {
                    title: "Text Content (Title, Desc, Button)",
                    value: "text",
                  },
                  { title: "Overlay Image Content", value: "image" },
                ],
                layout: "radio",
              },
              initialValue: "text",
            }),
            defineField({
              name: "position",
              title: "Content Position",
              type: "string",
              options: {
                list: [
                  { title: "Top Left", value: "top-left" },
                  { title: "Top Center", value: "top-center" },
                  { title: "Top Right", value: "top-right" },
                  { title: "Middle Left (Default)", value: "middle-left" },
                  { title: "Center", value: "center" },
                  { title: "Middle Right", value: "middle-right" },
                  { title: "Bottom Left", value: "bottom-left" },
                  { title: "Bottom Center", value: "bottom-center" },
                  { title: "Bottom Right", value: "bottom-right" },
                ],
              },
              initialValue: "middle-left",
              hidden: ({ parent }) => parent?.contentType === "none",
            }),

            // Text Content Fields
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              hidden: ({ parent }) => parent?.contentType !== "text",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
              hidden: ({ parent }) => parent?.contentType !== "text",
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              hidden: ({ parent }) => parent?.contentType !== "text",
            }),
            defineField({
              name: "buttonLink",
              title: "Button Link",
              type: "string",
              hidden: ({ parent }) => parent?.contentType !== "text",
            }),

            // Custom Color Fields (Color Picker)
            defineField({
              name: "titleColor",
              title: "Title Color",
              type: "color",
              description: "Pick custom color for the Title",
              hidden: ({ parent }) => parent?.contentType !== "text",
            }),
            defineField({
              name: "descColor",
              title: "Description Color",
              type: "color",
              description: "Pick custom color for the Description",
              hidden: ({ parent }) => parent?.contentType !== "text",
            }),
            defineField({
              name: "buttonBgColor",
              title: "Color",
              type: "color",
              description: "Pick custom color",
            }),
            defineField({
              name: "buttonTextColor",
              title: "Button Text Color",
              type: "color",
              description: "Pick custom color for Button Text",
              hidden: ({ parent }) => parent?.contentType !== "text",
            }),

            defineField({
              name: "contentImage",
              title: "Content Overlay Image",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.contentType !== "image",
            }),
            defineField({
              name: "contentImageWidth",
              title: "Overlay Image Max Width (px)",
              type: "number",
              initialValue: 240,
              hidden: ({ parent }) => parent?.contentType !== "image",
            }),
          ],
          preview: {
            select: {
              title: "title",
              contentType: "contentType",
              media: "backgroundImage",
            },
            prepare({ title, contentType, media }) {
              return {
                title: title || `Slide (${contentType || "none"})`,
                media,
              };
            },
          },
        },
      ],
    }),
  ],
});
