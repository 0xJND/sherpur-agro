"use server";

import { sanityClient } from "@/sanity/lib/client";
import { cacheConf } from "../hooks/cacheConf";
import { groq } from "next-sanity";

export const headerData = async () => {
  const query = groq`
    *[_type == "headerSettings"][0]{
        searchPlaceholder,
        categoriesButtonText,
        primaryNavLinks[]{
            _key,
            label,
            href
        },
        secondaryNavLinks[]{
            _key,
            label,
            href
        },
        signInLink{
            label,
            href
        },
        signUpLink{
            label,
            href
        }
    }
  `;

  const data = await sanityClient.fetch(
    query,
    {},
    cacheConf({
      revalidate: 3600,
      tags: ["header-settings"],
    }),
  );

  return data;
};
