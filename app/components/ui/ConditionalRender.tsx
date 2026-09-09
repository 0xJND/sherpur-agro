"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalRenderProps {
  excludedPaths: string[];
  children: ReactNode;
}

export default function ConditionalRender({
  excludedPaths,
  children,
}: ConditionalRenderProps) {
  const pathname = usePathname();

  const shouldExclude = excludedPaths.some((path) => {
    if (path === "/") return pathname === "/";
    return pathname === path || pathname.startsWith(`${path}/`);
  });

  if (shouldExclude) {
    return null;
  }

  return <>{children}</>;
}
