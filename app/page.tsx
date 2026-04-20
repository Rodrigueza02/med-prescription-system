import { HeroHeader } from "@/components/prescription/HeroHeader";
import { PrescriptionLayout } from "@/components/prescription/PrescriptionLayout";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#fdf6f0" }}>
      <HeroHeader />
      <PrescriptionLayout />
    </div>
  );
}
