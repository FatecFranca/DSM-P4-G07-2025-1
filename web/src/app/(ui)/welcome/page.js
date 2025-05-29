import { WelcomeCard } from "@/components/ui/welcomeCard";

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-white to-[var(--color-white-matte)]">
      <WelcomeCard />
    </main>
  );
}