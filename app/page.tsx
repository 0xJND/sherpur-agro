import { CloudShader } from "@/components/ui/cloud-shader";

function Home() {
  return (
    <section className="relative h-[700px]">
      <CloudShader className="absolute inset-0 opacity-80 blur-[10px]" />
    </section>
  );
}

export default Home;
