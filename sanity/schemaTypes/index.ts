import { type SchemaTypeDefinition } from "sanity";
import { siteSettings } from "./siteSettings";
import header from "./header";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, header],
};
