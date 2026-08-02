export default function AnimatedBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[var(--cp-bg)]" aria-hidden="true" />
      {/* Game-like scanlines/grid overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(var(--cp-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cp-cyan) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* HUD vignette */}
      <div className="fixed inset-0 -z-10 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)]" />
    </>
  );
}
