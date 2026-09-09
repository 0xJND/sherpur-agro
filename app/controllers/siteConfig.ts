"use server";

import { sanityClient } from "@/sanity/lib/client";
import { cacheConf } from "../hooks/cacheConf";

export const siteConfig = async () => {
  const query = `
    *[_type == "siteSettings"][0]{
      ...,
      "logo": logo.asset->url
    }
  `;

  const data = await sanityClient.fetch(
    query,
    {},
    cacheConf({
      revalidate: 3600,
      tags: ["site-settings"],
    }),
  );

  return data;
};
