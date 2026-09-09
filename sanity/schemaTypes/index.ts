import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./schema/siteSettings";
import header from "./schema/header";
import categories from "./categories";
import subCategory from "./schema/subCategory";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, header, categories, subCategory],
};
