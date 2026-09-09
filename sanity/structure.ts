import { LayoutTemplate, Palette, Settings } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Appearance")
        .icon(Palette)
        .child(
          S.list()
            .title("Appearance")
            .items([
              S.listItem()
                .title("Header Settings")
                .icon(LayoutTemplate)
                .id("headerSettings")
                .child(
                  S.document()
                    .schemaType("headerSettings")
                    .documentId("headerSettings"),
                ),
            ]),
        ),
      S.listItem()
        .title("Settings")
        .icon(Settings)
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["siteSettings", "headerSettings"].includes(listItem.getId() || ""),
      ),
    ]);
