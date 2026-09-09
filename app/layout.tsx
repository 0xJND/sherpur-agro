import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "./controllers/siteConfig";
import Header from "@/app/components/layout/Header";
import { Roboto, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import ConditionalRender from "./components/ui/ConditionalRender";
import { headerData } from "./controllers/headerData";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const robot = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sherpur Agro",
  description: "",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [siteConfig_, headerData_] = await Promise.all([
    siteConfig(),
    headerData(),
  ]);
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "text-slate-900",
        robot.className,
        "font-sans",
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalRender excludedPaths={["/admin/structure"]}>
          <Header logo={siteConfig_?.logo} data={headerData_} />
        </ConditionalRender>

        {children}
      </body>
    </html>
  );
}
