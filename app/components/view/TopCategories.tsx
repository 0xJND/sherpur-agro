import { topCategories } from "@/app/controllers/topCategories";
import CategorySlider from "../ui/CategorySlider";

async function TopCategories() {
  const categoriesData_ = await topCategories();

  return (
    <section className="flex justify-center w-full">
      <div className="w-full max-w-[1280px] p-2 md:pt-3 lg:pt-5 relative z-10 lg:px-8">
        <h6 className="text-sm md:text-base md:flex hidden lg:text-xl font-semibold">
          Top categories
        </h6>
        <CategorySlider items={categoriesData_ || []} />
      </div>
    </section>
  );
}

export default TopCategories;
