"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Code, Globe, Mail } from "lucide-react";
import { useRef } from "react";

import SectionHeading from "@/components/section-heading";

export default function About() {
  const container = useRef<HTMLDivElement>(null);

  const socials = [
    { icon: Code, href: "https://github.com/Matheusmdr", label: "GITHUB" },
    { icon: Globe, href: "https://linkedin.com/in/matheus-magalhães-da-rocha", label: "LINKEDIN" },
    { icon: Mail, href: "mailto:matheus.m.rocha@unesp.br", label: "E-MAIL" },
  ];

  useGSAP(
    () => {
      gsap.from(".shard-node", {
        opacity: 0,
        x: -20,
        duration: 0.2,
        stagger: 0.1,
        ease: "steps(3)",
      });
    },
    { scope: container }
  );

  return (
    <div ref={container} className="mx-auto max-w-4xl space-y-16 pt-8 relative">
      {/* Background HUD decorations */}
      <div className="absolute top-0 right-0 w-64 h-full pointer-events-none opacity-20 stripes-bg-red z-[-1]" />

      <SectionHeading subtitle="SOBRE MIM">
        BIOGRAFIA
      </SectionHeading>

      <section className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 space-y-4">
          {/* Avatar / Character slot */}
          <div className="aspect-[3/4] bg-[var(--cp-surface-light)] border border-[var(--cp-red)] relative p-2 overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--cp-red)] opacity-10 group-hover:opacity-0 transition-opacity" />
            <div className="w-full h-full bg-[var(--cp-bg)] flex items-center justify-center flex-col gap-2 relative z-10 border border-[var(--cp-surface)]">
              <div className="w-24 h-24 border-2 border-[var(--cp-cyan)] rounded-full border-dashed animate-[spin_10s_linear_infinite]" />
              <span className="font-display text-2xl font-bold text-[var(--cp-cyan)] mt-4">MATHEUS</span>
              <span className="font-mono text-[10px] text-black bg-[var(--cp-cyan)] px-2 py-0.5 font-bold">FULLSTACK</span>
            </div>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[var(--cp-red)] z-20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[var(--cp-red)] z-20" />
          </div>

          <div className="space-y-1">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="group flex items-center justify-between bg-[var(--cp-surface)] border border-[var(--cp-red-dark)] p-3 hover:bg-[var(--cp-cyan)] hover:border-[var(--cp-cyan)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <social.icon size={16} className="text-[var(--cp-red)] group-hover:text-black" />
                  <span className="font-mono text-xs font-bold text-[var(--cp-red)] group-hover:text-black uppercase">
                    {social.label}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-black opacity-0 group-hover:opacity-100">&gt;</span>
              </a>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/3 space-y-8">
          {/* Journal entry style block */}
          <div className="bg-[var(--cp-bg)] p-8 border border-[var(--cp-red)] relative shadow-[inset_0_0_20px_rgba(255,42,75,0.05)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--cp-red-dark)]" />
            <h3 className="font-display text-2xl font-bold text-[var(--cp-red)] mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--cp-red)] inline-block" /> RESUMO
            </h3>
            <div className="font-mono text-sm leading-relaxed text-[var(--cp-text-primary)] space-y-4">
              <p>
                Engenheiro de Software Fullstack com sólida experiência na arquitetura e liderança técnica de aplicações web escaláveis. Especialista no ecossistema JavaScript/TypeScript (Next.js, React, Node.js), com experiência prática no desenvolvimento de produtos SaaS de Inteligência Artificial e plataformas multi-tenant.
              </p>
              <p>
                Atuo unindo o domínio em desenvolvimento front-end à construção de back-ends robustos (Node.js, Python/FastAPI) e bancos de dados eficientes, priorizando código limpo, otimização técnica (Core Web Vitals) e soluções inteligentes para o negócio.
              </p>
              <p className="text-[var(--cp-cyan)] mt-6 bg-[var(--cp-surface)] p-2 inline-block">
                &gt; Orientado a resultados e à resolução de problemas de negócio.
              </p>
              <div className="pt-4">
                <a href="/cv-matheus-rocha.pdf" download className="cp-btn-primary !text-sm flex items-center justify-center gap-2 max-w-xs">
                  BAIXAR CURRÍCULO (PDF)
                </a>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 border-b-2 border-[var(--cp-red)] pb-2 mb-4">
              <h3 className="font-display text-2xl font-bold text-[var(--cp-red)] uppercase">
                HABILIDADES TÉCNICAS
              </h3>
              <div className="flex-1" />
              <span className="font-mono text-[10px] text-[var(--cp-cyan)] border border-[var(--cp-cyan)] px-1">CYBERWARE</span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {[
                { name: "FRONTEND", type: "React.js, Next.js, Vue 3, React Native, Tailwind, TypeScript" },
                { name: "BACKEND", type: "Node.js, Python, FastAPI, Laravel, WebSockets, APIs REST" },
                { name: "DATABASE", type: "PostgreSQL, MySQL, Prisma ORM, SQLAlchemy" },
                { name: "DEVOPS & CLOUD", type: "Docker, Git, CI/CD, AWS S3, Cloudflare R2" },
                { name: "QUALIDADE", type: "Testes Unitários, SEO Técnico, Core Web Vitals" }
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="shard-node flex items-center justify-between bg-[var(--cp-surface)] p-3 border border-[var(--cp-red-dark)] hover:bg-[var(--cp-cyan)] group transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="font-display text-lg font-bold text-[var(--cp-red)] group-hover:text-black uppercase">
                      {skill.name}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--cp-text-muted)] group-hover:text-black/70">
                      {skill.type}
                    </span>
                  </div>
                  <div className="w-8 h-8 flex items-center justify-center border border-[var(--cp-red-dark)] group-hover:border-black/20 text-[var(--cp-red)] group-hover:text-black">
                    <span className="font-mono text-[10px]">+</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
