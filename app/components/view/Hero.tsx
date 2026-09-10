import { heroData } from "@/app/controllers/heroData";
import RenderWidget from "@/app/hooks/render";

async function Hero() {
  const [heroData_] = await Promise.all([heroData()]);
  const widgets = heroData_?.widgets || [];
  return (
    <section className="relative w-full flex h-fit justify-center items-center overflow-hidden ">
      <div className="w-full max-w-[1480px]  p-2 md:pt-3 lg:pt-5 relative z-10 md:px-6 lg:px-8">
        <div className="grid grid-cols-12">
          {widgets.map((com: any) => {
            return <RenderWidget key={com._key || com._type} data={com} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Hero;
