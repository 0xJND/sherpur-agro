"use server";

import { sanityClient } from "@/sanity/lib/client";
import { cacheConf } from "../hooks/cacheConf";
import { groq } from "next-sanity";

export const topCategories = async () => {
  const query = groq`
    *[_type == "category"]{
        name,
        "slug": slug.current,
        "icon": icon.asset->url
    }
  `;

  const data = await sanityClient.fetch(
    query,
    {},
    cacheConf({
      revalidate: 3600,
      tags: ["top-categories"],
    }),
  );

  return data;
};
