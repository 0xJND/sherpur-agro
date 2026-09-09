import { CloudShader } from "@/components/ui/cloud-shader";
import TopCategories from "../ui/TopCategories";

function Hero() {
  return (
    <section className="relative w-full min-h-[200px] flex justify-center items-center overflow-hidden">
      <CloudShader className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-80 blur-[10px]" />
      <div className="w-full max-w-[1480px] py-10 relative z-10 px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4"></div>
      </div>
    </section>
  );
}

export default Hero;
