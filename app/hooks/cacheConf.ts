export const cacheConf = (options: {
  revalidate?: number | false;
  tags?: string[];
}) => {
  if (process.env.NODE_ENV !== "production") {
    return { next: { revalidate: 0 } };
  }

  return {
    next: options,
  };
};
