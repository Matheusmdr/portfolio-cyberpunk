"use client";

import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import { use } from "react";

import { orpc } from "@/utils/orpc";

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { data: project, isLoading, error } = useQuery(
    orpc.projects.getBySlug.queryOptions({ input: { slug: resolvedParams.slug } })
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl pt-8">
        <div className="h-[400px] bg-[var(--cp-surface)] stripes-bg flex items-center justify-center opacity-50 border-2 border-[var(--cp-cyan)]">
          <p className="font-mono text-[var(--cp-yellow)] text-sm animate-pulse">DECRYPTING_SHARD...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="mx-auto max-w-4xl pt-8 text-center bg-[var(--cp-surface)] p-12 border-l-8 border-[var(--cp-red)]">
        <h1 className="mb-4 font-display text-4xl font-bold text-[var(--cp-red)] uppercase cp-glitch" data-text="DATA_CORRUPTED">DATA_CORRUPTED</h1>
        <Link href="/projects" className="cp-btn-danger mt-4 inline-block">
          RETURN
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl pb-20 pt-8 relative">
      <div className="absolute top-0 right-[-50px] bottom-0 w-8 border-l border-[var(--cp-surface-light)] hidden lg:flex flex-col items-center py-10 gap-4 opacity-50">
        <div className="text-[var(--cp-cyan)] font-mono text-[10px] -rotate-90 whitespace-nowrap mt-10">ID: {project.id}</div>
        <div className="w-1 h-24 bg-[var(--cp-red-dark)] mt-10" />
        <div className="w-2 h-2 bg-[var(--cp-red)]" />
      </div>

      {/* Back link */}
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-2 bg-[var(--cp-surface)] px-3 py-1 font-mono text-xs font-bold text-[var(--cp-red)] border border-[var(--cp-red-dark)] transition-colors hover:bg-[var(--cp-cyan)] hover:text-black uppercase hover:border-[var(--cp-cyan)]"
      >
        <span className="opacity-50">#</span> VOLTAR PARA PROJETOS
      </Link>

      {/* Title Header */}
      <div className="mb-6 flex flex-col border-b-2 border-[var(--cp-red)] pb-2 relative">
        <div className="absolute top-0 right-0 w-16 h-4 bg-[var(--cp-red)] stripes-bg-red" />
        <h1 className="font-display text-4xl font-bold uppercase tracking-widest text-[var(--cp-red)] md:text-5xl lg:text-6xl cp-glitch" data-text={project.title}>
          {project.title}
        </h1>
      </div>

      {/* Cover */}
      <div className="mb-10 relative bg-[var(--cp-surface)] p-2 border border-[var(--cp-red)]">
        <div className="relative overflow-hidden">
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full object-cover max-h-[480px] mix-blend-screen opacity-90"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-[var(--cp-bg)] stripes-bg-red">
              <span className="font-display text-5xl font-bold text-[var(--cp-red-dark)]">
                SEM IMAGEM
              </span>
            </div>
          )}
          
          <div className="hud-crosshair absolute top-4 left-4 w-12 h-12 pointer-events-none" />
          <div className="hud-crosshair absolute bottom-4 right-4 w-12 h-12 pointer-events-none" />
        </div>
      </div>

      {/* Info Panel */}
      <div className="bg-[var(--cp-surface)] mb-10 flex flex-col md:flex-row border border-[var(--cp-red)] shadow-[inset_0_0_20px_rgba(255,42,75,0.05)]">
        <div className="flex-1 p-8 space-y-4 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-[var(--cp-cyan)]" />
          <p className="font-mono text-[10px] text-[var(--cp-cyan)] uppercase bg-[var(--cp-bg)] inline-block px-2 border border-[var(--cp-cyan)]">
            RESUMO DO PROJETO
          </p>
          <p className="font-mono text-sm leading-relaxed text-[var(--cp-text-primary)]">
            {project.description}
          </p>
        </div>
        <div className="flex flex-col gap-3 min-w-[200px] p-8 border-l border-[var(--cp-red-dark)] bg-[var(--cp-bg)]">
          <p className="font-mono text-[10px] text-[var(--cp-red)] uppercase border-b border-[var(--cp-red-dark)] pb-1">
            LINKS
          </p>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              <button className="cp-btn-primary w-full flex items-center justify-center gap-2 text-sm">
                <ExternalLink size={14} /> VER DEPLOY
              </button>
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              <button className="cp-btn-danger w-full flex items-center justify-center gap-2 text-sm">
                <Code size={14} /> VER CÓDIGO
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid gap-12 md:grid-cols-[1fr_280px]">
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-[var(--cp-red)] pb-2 mb-4">
            <h2 className="font-display text-2xl font-bold uppercase text-[var(--cp-red)]">
              DETALHES
            </h2>
            <div className="flex-1" />
            <span className="font-mono text-[10px] text-[var(--cp-cyan)] border border-[var(--cp-cyan)] px-1">LOG_DATA</span>
          </div>
          
          <div className="prose prose-invert max-w-none font-mono text-sm bg-[var(--cp-surface)] border border-[var(--cp-red-dark)] p-6">
            {project.longDescription ? (
              <p className="whitespace-pre-line leading-relaxed text-[var(--cp-text-primary)]">
                {project.longDescription}
              </p>
            ) : (
              <p className="italic text-[var(--cp-text-muted)]">Nenhuma descrição detalhada disponível.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold uppercase text-[var(--cp-red)] border-b-2 border-[var(--cp-red-dark)] pb-1">
            TECNOLOGIAS
          </h3>
          <div className="flex flex-col gap-1">
            {project.techStack?.map((tech) => (
              <span key={tech} className="bg-[var(--cp-surface)] px-3 py-2 font-mono text-xs text-[var(--cp-red)] border border-[var(--cp-red-dark)] uppercase flex items-center justify-between hover:bg-[var(--cp-cyan)] hover:text-black transition-colors cursor-default group">
                {tech} <span className="text-[10px] opacity-0 group-hover:opacity-100">■</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
