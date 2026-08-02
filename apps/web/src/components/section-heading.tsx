export default function SectionHeading({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mb-12 space-y-2 border-l-4 border-[var(--cp-yellow)] pl-4">
      <h2 className="font-display text-4xl font-bold tracking-wide text-white md:text-5xl lg:text-6xl uppercase cp-glitch" data-text={children as string}>
        {children}
      </h2>
      {subtitle && (
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-[var(--cp-red)]" />
          <p className="font-mono text-sm uppercase tracking-widest text-[var(--cp-text-muted)]">
            {subtitle}
          </p>
        </div>
      )}
    </div>
  );
}
