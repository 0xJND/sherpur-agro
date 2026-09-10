"use server";

import { sanityClient } from "@/sanity/lib/client";
import { cacheConf } from "../hooks/cacheConf";
import { groq } from "next-sanity";

export const heroData = async () => {
  const query = groq`
    *[_type == "hero" && _id == "hero"][0] {
      _id,
      widgets[] {
        _key,
        _type,
        _type == "heroSliderWidget" => {
          widgetTitle,
          slides[] {
            _key,
            "backgroundImageUrl": backgroundImage.asset->url,
            slideLink,
            contentType,
            position,
            title,
            description,
            buttonText,
            buttonLink,
            "titleColor": titleColor.hex,
            "descColor": descColor.hex,
            "buttonBgColor": buttonBgColor.hex,
            "buttonTextColor": buttonTextColor.hex,
            "contentImageUrl": contentImage.asset->url,
            contentImageWidth
          }
        }
      }
    }
  `;

  const data = await sanityClient.fetch(
    query,
    {},
    cacheConf({
      revalidate: 3600,
      tags: ["hero-data"],
    }),
  );

  return data;
};
