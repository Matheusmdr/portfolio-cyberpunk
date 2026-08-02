"use client";

import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { useRef } from "react";

import ProjectCard from "@/components/project-card";
import SectionHeading from "@/components/section-heading";
import { orpc } from "@/utils/orpc";

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery(orpc.projects.list.queryOptions());
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isLoading && projects.length > 0) {
        gsap.fromTo(".project-grid-item", 
          { opacity: 0, scale: 0.95 },
          { 
            opacity: 1, scale: 1, 
            duration: 0.2, 
            stagger: 0.05, 
            ease: "none" 
          }
        );
      }
    },
    { scope: container, dependencies: [isLoading, projects.length] }
  );

  return (
    <div ref={container} className="pt-8">
      <div className="flex justify-between items-end mb-12 border-b-2 border-[var(--cp-red)] pb-2 relative">
        <div className="absolute bottom-0 right-0 w-32 h-1 bg-[var(--cp-cyan)] translate-y-full" />
        <SectionHeading subtitle="PORTFÓLIO">
          PROJETOS
        </SectionHeading>
        <div className="hidden font-mono text-[10px] text-[var(--cp-red)] md:flex items-center gap-4 mb-2">
          <span className="border border-[var(--cp-red)] px-2 py-1">TOTAL: {projects.length}</span>
          <span className="border border-[var(--cp-cyan)] text-[var(--cp-cyan)] px-2 py-1">FILTER: ALL</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[380px] bg-[var(--cp-surface)] opacity-30 flex items-center justify-center font-mono text-xs text-[var(--cp-cyan)] stripes-bg-red border border-[var(--cp-red)]"
            >
              CARREGANDO...
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="project-grid-item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      {!isLoading && projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-[var(--cp-surface)] border border-[var(--cp-red)] shadow-[inset_0_0_20px_rgba(255,42,75,0.1)]">
          <span className="font-display text-5xl font-bold text-[var(--cp-red)] mb-4 cp-glitch" data-text="VAZIO">VAZIO</span>
          <p className="font-mono text-sm text-[var(--cp-text-muted)] uppercase">
            &gt; NENHUM PROJETO ENCONTRADO
          </p>
        </div>
      )}
    </div>
  );
}
