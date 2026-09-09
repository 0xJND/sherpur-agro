import {
  FolderTree,
  Folders,
  LayoutTemplate,
  Palette,
  Settings,
  Tags,
} from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("categoriesGroup")
        .title("Categories")
        .icon(FolderTree)
        .child(
          S.list()
            .id("categoryManagement")
            .title("Category Management")
            .items([
              S.listItem()
                .id("allMainCategories")
                .title("Main Categories")
                .icon(Folders)
                .child(S.documentTypeList("category").title("Main Categories")),

              S.listItem()
                .id("allSubCategories")
                .title("All Sub-Categories")
                .icon(Tags)
                .child(
                  S.documentTypeList("subCategory").title("All Sub-Categories"),
                ),

              S.divider(),

              S.listItem()
                .id("subCategoriesByCategory")
                .title("Sub-Categories by Category")
                .icon(FolderTree)
                .child(
                  S.documentTypeList("category")
                    .title("Select Main Category")
                    .child((categoryId) =>
                      S.documentList()
                        .title("Sub-Categories")
                        .filter(
                          '_type == "subCategory" && parentCategory._ref == $categoryId',
                        )
                        .params({ categoryId }),
                    ),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .id("appearanceGroup")
        .title("Appearance")
        .icon(Palette)
        .child(
          S.list()
            .id("appearanceList")
            .title("Appearance")
            .items([
              S.listItem()
                .id("headerSettings")
                .title("Header Settings")
                .icon(LayoutTemplate)
                .child(
                  S.document()
                    .schemaType("headerSettings")
                    .documentId("headerSettings"),
                ),
            ]),
        ),

      S.listItem()
        .id("siteSetting")
        .title("Settings")
        .icon(Settings)
        .child(
          S.document().schemaType("siteSetting").documentId("siteSetting"),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            "siteSetting",
            "headerSettings",
            "category",
            "subCategory",
          ].includes(listItem.getId() || ""),
      ),
    ]);
