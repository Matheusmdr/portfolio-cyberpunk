"use client";

import { ExternalLink, Code } from "lucide-react";
import Link from "next/link";

type ProjectCardProps = {
  project: {
    id: string;
    title: string;
    slug: string;
    description: string;
    coverImage?: string | null;
    techStack?: string[] | null;
    liveUrl?: string | null;
    repoUrl?: string | null;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  // Deterministic rarity based on ID length or first char for visual variety
  const rarityColors = ['var(--cp-cyan)', 'var(--cp-yellow)', '#b026ff', '#ffffff'];
  const rarityIndex = project.id.charCodeAt(0) % rarityColors.length;
  const borderColor = rarityColors[rarityIndex];

  return (
    <div className="cp-card group flex h-full flex-col cursor-pointer" style={{ borderLeftColor: borderColor }}>
      {/* Cover image area with HUD overlay */}
      <div className="relative h-48 overflow-hidden bg-black group-hover:opacity-90 transition-opacity">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className="h-full w-full object-cover opacity-80 mix-blend-screen transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="stripes-bg-red flex h-full w-full items-center justify-center opacity-30" />
        )}
        
        {/* CP2077 HUD elements on image */}
        <div className="hud-crosshair absolute top-2 left-2 w-8 h-8 pointer-events-none" />
        <div className="hud-crosshair absolute bottom-2 right-2 w-8 h-8 pointer-events-none" />
        
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 font-mono text-[10px] text-white border border-[var(--cp-text-muted)]">
          WT: {Math.floor(Math.random() * 10)}.0
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col p-4 pt-5 relative">
        {/* Tier/Rarity indicator */}
        <div className="absolute -top-3 right-4 bg-[var(--cp-bg)] px-2 font-mono text-[10px] uppercase font-bold" style={{ color: borderColor }}>
          [TIER_{rarityIndex + 1}]
        </div>

        <Link href={`/projects/${project.slug}`} className="block">
          <h3 className="font-display mb-2 text-2xl font-bold tracking-wide text-white group-hover:text-[var(--cp-yellow)] transition-colors uppercase truncate">
            {project.title}
          </h3>
        </Link>

        <p className="mb-4 line-clamp-2 font-mono text-xs leading-relaxed text-[var(--cp-text-muted)]">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.techStack?.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-[var(--cp-surface-light)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--cp-cyan)] uppercase border border-[var(--cp-cyan)] opacity-70">
              {tech}
            </span>
          ))}
          {project.techStack && project.techStack.length > 3 && (
            <span className="bg-[var(--cp-surface-light)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--cp-text-muted)] uppercase border border-[var(--cp-text-muted)]">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between border-t border-[var(--cp-text-muted)] pt-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] font-bold text-[var(--cp-yellow)] hover:text-white transition-colors uppercase"
              >
                [VER DEPLOY]
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] font-bold text-[var(--cp-cyan)] hover:text-white transition-colors uppercase"
              >
                [CÓDIGO]
              </a>
            )}
          </div>
          <div className="font-mono text-[10px] text-[var(--cp-pink)] font-bold">
            E$ {Math.floor(Math.random() * 9000 + 1000)}
          </div>
        </div>
      </div>
    </div>
  );
}
