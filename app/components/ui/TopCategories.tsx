import { topCategories } from "@/app/controllers/topCategories";
import Image from "next/image";
import Link from "next/link";

async function TopCategories() {
  const [categories_] = await Promise.all([topCategories()]);

  return (
    <div className="bg-white p-5 pt-3  border-zinc-100 border">
      <h3 className="text-lg font-medium">Top categories</h3>
      <div className="pt-4">
        {categories_?.map(
          (data: { icon: any; name: string; slug: string }, i: number) => {
            const { slug, name, icon } = data;
            return (
              <Link key={`category-${slug}`} href={`/category/${slug}`}>
                <article className="flex gap-2 p-2 bg-slate-100/40 border border-zinc-200/60">
                  <Image alt={name} src={icon} width={40} height={40} />
                  <div className="py-1">
                    <h5 className="text-sm font-semibold">{name}</h5>
                    <p className="text-[10px] text-zinc-500">Explore</p>
                  </div>
                </article>
              </Link>
            );
          },
        )}
      </div>
    </div>
  );
}

export default TopCategories;
