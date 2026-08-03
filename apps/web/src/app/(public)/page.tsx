"use client";

import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

import ProjectCard from "@/components/project-card";
import { orpc } from "@/utils/orpc";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const { data: projects = [] } = useQuery(orpc.projects.list.queryOptions());
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      
      tl.fromTo(".cp-hero-elem", 
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.1, stagger: 0.1, ease: "steps(4)" }
      );

      gsap.fromTo(".cp-card-elem",
        { opacity: 0, scale: 0.98 },
        { 
          opacity: 1, scale: 1, 
          duration: 0.2, stagger: 0.1, 
          scrollTrigger: {
            trigger: ".featured-section",
            start: "top 80%",
          }
        }
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="space-y-40">
      {/* === HERO SECTION === */}
      <section className="relative flex min-h-[70vh] flex-col justify-center py-20">
        <div className="absolute inset-0 z-[-1]" />
        
        <div className="cp-hero-elem mb-6 inline-flex w-fit items-center gap-2 bg-[var(--cp-red)] px-3 py-1 font-mono text-xs font-bold text-white uppercase clip-path-slant">
          <span className="w-2 h-2 bg-white animate-pulse" />
          ENGENHEIRO DE SOFTWARE FULLSTACK
        </div>

        <h1 className="cp-hero-elem font-display mb-1 text-5xl font-bold uppercase leading-[0.9] tracking-widest text-[var(--cp-red)] sm:text-7xl md:text-8xl cp-glitch" data-text="MATHEUS">
          MATHEUS
        </h1>
        <h1 className="cp-hero-elem font-display mb-8 text-4xl font-bold uppercase leading-[0.9] tracking-widest text-[var(--cp-cyan)] sm:text-6xl md:text-7xl">
          MAGALHÃES DA ROCHA<span className="text-[var(--cp-red)]">_</span>
        </h1>

        <div className="cp-hero-elem stripes-bg-red h-4 w-64 mb-8"></div>

        <p className="cp-hero-elem font-mono mb-10 max-w-2xl text-sm leading-relaxed text-[var(--cp-text-primary)] md:text-base uppercase bg-[var(--cp-surface)] p-4 border-l-4 border-[var(--cp-cyan)] shadow-[10px_10px_0_rgba(0,240,255,0.1)]">
          Engenheiro de Software Fullstack com experiência em arquitetura, desenvolvimento e evolução de produtos web e SaaS. Domínio do ecossistema JavaScript/TypeScript, Python, bancos relacionais e nuvem.
        </p>

        <div className="cp-hero-elem flex flex-wrap items-center gap-6">
          <Link href="/projects" className="cp-btn-primary">
            VER PROJETOS
          </Link>
          <Link href="/contact" className="cp-btn-danger">
            ENTRAR EM CONTATO
          </Link>
          <a href="/cv-matheus-rocha.pdf" download className="cp-btn-primary !bg-transparent hover:!bg-[var(--cp-surface-light)] !border-dashed !border-[var(--cp-text-muted)] !text-[var(--cp-text-muted)] group">
            DOWNLOAD CV
          </a>
        </div>

        {/* Stats bar */}
        <div className="cp-hero-elem mt-24 grid grid-cols-2 gap-4 md:grid-cols-4 pt-8 border-t-2 border-[var(--cp-red)]">
          {[
            { value: "05", label: "ANOS DE EXP", suffix: "+" },
            { value: "04", label: "EMPRESAS", suffix: "" },
            { value: "100", label: "REMOTO", suffix: "%" },
            { value: "OK", label: "SISTEMA", suffix: "" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col relative pl-4 border-l border-[var(--cp-surface-light)]">
              <div className="absolute left-0 top-1/2 w-2 h-2 bg-[var(--cp-cyan)] -translate-y-1/2 -translate-x-1/2 rotate-45" />
              <div className="font-display text-4xl font-bold text-[var(--cp-red)]">
                {stat.value}<span className="text-[var(--cp-cyan)] text-2xl">{stat.suffix}</span>
              </div>
              <span className="font-mono text-[10px] uppercase text-[var(--cp-text-muted)]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURED PROJECTS === */}
      <section className="featured-section relative">
        <div className="mb-8 flex items-end justify-between border-b-2 border-[var(--cp-red)] pb-2">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-[var(--cp-red)] cp-glitch" data-text="PROJETOS RECENTES">
              PROJETOS RECENTES
            </h2>
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-[var(--cp-cyan)] mt-1 bg-[var(--cp-surface-light)] inline-block px-2">
              [DESTAQUES]
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden items-center bg-[var(--cp-surface)] px-4 py-2 font-mono text-xs font-bold text-[var(--cp-red)] hover:bg-[var(--cp-cyan)] hover:text-black transition-colors md:inline-flex uppercase border border-[var(--cp-red)]"
          >
            VER TODOS
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <div key={project.id} className="cp-card-elem">
              <ProjectCard project={project} />
            </div>
          ))}
          {featuredProjects.length === 0 && (
            <div className="col-span-full stripes-bg-red flex items-center justify-center py-20 opacity-50 border border-[var(--cp-red)]">
              <span className="bg-[var(--cp-surface)] px-4 py-2 font-mono text-xl font-bold text-[var(--cp-red)]">NENHUM PROJETO ENCONTRADO</span>
            </div>
          )}
        </div>
      </section>

      {/* === ABOUT CTA === */}
      <section className="cp-card p-0 overflow-hidden border border-[var(--cp-red)]">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1 p-10 md:p-14 space-y-6 bg-[var(--cp-surface)] relative">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--cp-red)] opacity-10 clip-path-slant" />
            <h2 className="font-display text-4xl font-bold uppercase tracking-widest text-[var(--cp-red)]">
              SOBRE <span className="text-[var(--cp-cyan)] text-chromatic">MIM</span>
            </h2>
            <p className="font-mono text-sm leading-relaxed text-[var(--cp-text-primary)] border-l-2 border-[var(--cp-red)] pl-4">
              Atuo em todo o ciclo de software, do levantamento de requisitos à entrega em produção, com foco em qualidade de código, performance e escalabilidade. 
            </p>
            <Link
              href="/about"
              className="mt-4 inline-flex cp-btn-primary"
            >
              LER MAIS
            </Link>
          </div>

          <div className="flex flex-1 justify-center items-center bg-[var(--cp-surface-light)] p-10 relative stripes-bg-red">
            <div className="absolute inset-0 border-[10px] border-[var(--cp-red-dark)] opacity-20 m-4" />
            <div className="bg-[var(--cp-bg)] p-8 border border-[var(--cp-red)] transform rotate-12 shadow-[20px_20px_0_rgba(255,42,75,0.2)]">
              <span className="font-display text-6xl font-black text-[var(--cp-red)] cp-glitch" data-text="ROCHA">ROCHA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
