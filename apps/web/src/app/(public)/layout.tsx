import AnimatedBackground from "@/components/animated-background";
import CyberNavbar from "@/components/glass-navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark-theme-override relative">
      <AnimatedBackground />
      <CyberNavbar />
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-20">
        {children}
      </main>
      <footer className="relative z-10 border-t-2 border-[var(--cp-red)] bg-[var(--cp-surface)] py-6 px-6 mt-20">
        <div className="mx-auto max-w-6xl flex justify-between items-center font-mono text-[10px] uppercase text-[var(--cp-text-muted)]">
          <p className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[var(--cp-yellow)] inline-block"></span>
            NETWATCH_SECURED // {new Date().getFullYear()}
          </p>
          <p className="text-[var(--cp-cyan)]">MDR.CORP // CONFIDENTIAL</p>
        </div>
      </footer>
    </div>
  );
}
