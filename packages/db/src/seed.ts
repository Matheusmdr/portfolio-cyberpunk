import { config } from "dotenv";
import { resolve } from "node:path";

// Load environment variables from apps/web/.env
config({ path: resolve(import.meta.dirname, "../../../apps/web/.env") });
config({ path: resolve(process.cwd(), "apps/web/.env") });

import { db } from "./index";
import { projects } from "./schema/projects";

const siteProjects = [
  {
    id: "portfolio-cyberpunk",
    title: "Portfolio Cyberpunk",
    slug: "portfolio-cyberpunk",
    description: "Meu portfólio pessoal interativo desenvolvido com a Better-T-Stack e estética cyberpunk.",
    longDescription:
      "Aplicação web de alta performance construída para destacar meus projetos, habilidades e experiência em desenvolvimento web. Monorepo desenvolvido com a Better-T-Stack (Next.js, Drizzle ORM, Turso, Better Auth, oRPC e Tailwind CSS).",
    coverImage: null,
    liveUrl: "https://portfolio-zx19.vercel.app",
    repoUrl: "https://github.com/Matheusmdr/portfolio",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Drizzle ORM", "Turso", "Better Auth", "Bun"],
    featured: true,
    sortOrder: 0,
    status: "published" as const,
  },
  {
    id: "educaba-frontend",
    title: "EducABA Frontend",
    slug: "educaba-frontend",
    description: "Frontend do gerenciador ABA da EducABA para acompanhamento terapêutico e gestão.",
    longDescription:
      "Sistema web desenvolvido para o gerenciador ABA da plataforma EducABA, facilitando o acompanhamento terapêutico, registro de sessões e gestão clínica com interface responsiva e moderna.",
    coverImage: null,
    liveUrl: "https://educaba-frontend.vercel.app",
    repoUrl: "https://github.com/Matheusmdr/educaba-frontend",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "React Hook Form"],
    featured: true,
    sortOrder: 1,
    status: "published" as const,
  },
  {
    id: "otologic",
    title: "Otologic",
    slug: "otologic",
    description: "Site institucional da clínica médica Otologic.",
    longDescription:
      "Plataforma web e site institucional desenvolvido para a clínica Otologic, permitindo apresentação de serviços médicos, corpo clínico e agendamento de consultas.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/otologic",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    featured: true,
    sortOrder: 2,
    status: "published" as const,
  },
  {
    id: "petroplus",
    title: "Petroplus",
    slug: "petroplus",
    description: "Site institucional e plataforma de soluções para a Petroplus.",
    longDescription:
      "Website institucional e plataforma corporativa desenvolvida para a Petroplus, com foco em apresentação de produtos, serviços em combustíveis e lubrificantes e contato corporativo.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/petroplus",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "TypeScript", "Tailwind CSS", "Headless UI"],
    featured: true,
    sortOrder: 3,
    status: "published" as const,
  },
  {
    id: "seguro-light",
    title: "Seguro Light",
    slug: "seguro-light",
    description: "Plataforma e site de cotação de seguros de forma simplificada.",
    longDescription:
      "Sistema web para simulação, cotação e contratação simplificada de seguros, com geração de sitemap dinâmica e painel administrativo.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/seguro-light",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "TypeScript", "Tailwind CSS", "Spatie"],
    featured: false,
    sortOrder: 4,
    status: "published" as const,
  },
  {
    id: "t2r-website",
    title: "T2R Website",
    slug: "t2r-website",
    description: "Website institucional para a T2R soluções corporativas.",
    longDescription:
      "Website institucional moderno desenvolvido para apresentar a empresa T2R, seu portfólio de soluções de tecnologia e canais diretos de comunicação.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/t2r-website",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "TypeScript", "Vite", "Tailwind CSS"],
    featured: false,
    sortOrder: 5,
    status: "published" as const,
  },
  {
    id: "trans-hizza",
    title: "Trans Hizza",
    slug: "trans-hizza",
    description: "Website institucional para a transportadora Trans Hizza.",
    longDescription:
      "Website institucional e plataforma de gestão logística desenvolvida para a transportadora Trans Hizza, destacando frota, rotas e rastreamento.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/trans-hizza",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "TypeScript", "Tailwind CSS", "Headless UI"],
    featured: false,
    sortOrder: 6,
    status: "published" as const,
  },
  {
    id: "vida-radiologia",
    title: "Vida Radiologia",
    slug: "vida-radiologia",
    description: "Site institucional para o instituto de radiologia Vida.",
    longDescription:
      "Website institucional voltado para o setor de diagnóstico por imagem do Instituto Vida Radiologia, apresentando exames, agendamentos e informações médicas aos pacientes.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/vida-radiologia",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "TypeScript", "Tailwind CSS", "Radix UI"],
    featured: true,
    sortOrder: 7,
    status: "published" as const,
  },
  {
    id: "vo-jorge",
    title: "Vô Jorge",
    slug: "vo-jorge",
    description: "Site institucional Vô Jorge.",
    longDescription:
      "Website institucional da marca Vô Jorge, destacando sua história, produtos artesanais e identidade visual com navegação fluida e moderna.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/vo-jorge",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "TypeScript", "Tailwind CSS", "Headless UI"],
    featured: false,
    sortOrder: 8,
    status: "published" as const,
  },
  {
    id: "simulador-de-linguagens-regulares",
    title: "Simulador de Linguagens Regulares",
    slug: "simulador-de-linguagens-regulares",
    description: "Aplicação web interativa para conversão e simulação de autômatos, ER e GR.",
    longDescription:
      "Ferramenta web desenvolvida para a disciplina de Linguagens Formais e Teoria da Computação. Permite converter e simular autômatos finitos, expressões regulares e gramáticas regulares visualmente.",
    coverImage: null,
    liveUrl: "https://simulador-er-af-gr.web.app",
    repoUrl: "https://github.com/Matheusmdr/Simulador-de-Linguagens-Regulares",
    techStack: ["React", "JavaScript", "Material UI", "Graphviz", "Sass"],
    featured: false,
    sortOrder: 9,
    status: "published" as const,
  },
  {
    id: "maquina-norma",
    title: "Máquina Norma",
    slug: "maquina-norma",
    description: "Simulador web da Máquina Norma.",
    longDescription:
      "Aplicação interativa desenvolvida em JavaScript para simulação do modelo teórico Máquina Norma da disciplina de LFTC.",
    coverImage: null,
    liveUrl: "https://Matheusmdr.github.io/maquina-norma/public",
    repoUrl: "https://github.com/Matheusmdr/maquina-norma",
    techStack: ["JavaScript", "HTML5", "CSS3"],
    featured: false,
    sortOrder: 10,
    status: "published" as const,
  },
  {
    id: "new-games",
    title: "New Games",
    slug: "new-games",
    description: "Portal web de jogos e entretenimento.",
    longDescription: "Site dinâmico em PHP/JS para catálogo e avaliação de jogos digitais.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/New-Games",
    techStack: ["PHP", "JavaScript", "HTML5", "CSS3"],
    featured: false,
    sortOrder: 11,
    status: "published" as const,
  },
  {
    id: "blog-web",
    title: "Blog Web",
    slug: "blog-web",
    description: "Atividade web de blog interativo.",
    longDescription: "Projeto de blog desenvolvido como atividade para a disciplina de Desenvolvimento Web.",
    coverImage: null,
    liveUrl: null,
    repoUrl: "https://github.com/Matheusmdr/Blog",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    featured: false,
    sortOrder: 12,
    status: "published" as const,
  },
];

async function seed() {
  console.log("🌱 Iniciando o seed dos projetos de sites...");

  for (const project of siteProjects) {
    await db
      .insert(projects)
      .values(project)
      .onConflictDoUpdate({
        target: projects.slug,
        set: {
          title: project.title,
          description: project.description,
          longDescription: project.longDescription,
          liveUrl: project.liveUrl,
          repoUrl: project.repoUrl,
          techStack: project.techStack,
          featured: project.featured,
          sortOrder: project.sortOrder,
          status: project.status,
          updatedAt: new Date(),
        },
      });
  }

  console.log(`✅ ${siteProjects.length} projetos de sites foram semeados com sucesso!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Erro ao executar o seed:", err);
  process.exit(1);
});
