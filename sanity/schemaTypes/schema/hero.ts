import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({
      name: "widgets",
      title: "Hero Widgets",
      type: "array",
      of: [{ type: "heroSliderWidget" }],
    }),
  ],
  preview: {
    select: {
      title: "sectionName",
      widgets: "widgets",
    },
    prepare({ title, widgets }) {
      return {
        title: title || "Hero Section",
        subtitle: `${widgets ? widgets.length : 0} widget(s)`,
      };
    },
  },
});
