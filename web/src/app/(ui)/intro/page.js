import { IntroScreen } from "@/components/ui/introScreen";
import { animalId } from "@/utils/api";

export default function IntroPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-[var(--color-white-matte)]">
      <IntroScreen animalId={animalId}/>
    </main>
  );
}
