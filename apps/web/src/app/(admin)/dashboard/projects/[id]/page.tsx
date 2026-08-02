"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { use } from "react";

import ProjectForm from "@/components/project-form";
import { Button } from "@portfolio/ui/components/button";
import { orpc } from "@/utils/orpc";

export default function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: projects = [], isLoading } = useQuery(orpc.projects.listAll.queryOptions());
  const project = projects.find((p) => p.id === id);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!project) {
    return <div>Projeto não encontrado.</div>;
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Editar Projeto</h1>
          <p className="text-muted-foreground">{project.title}</p>
        </div>
      </div>
      <div className="rounded-xl border bg-card p-6">
        <ProjectForm initialData={project as any} />
      </div>
    </div>
  );
}
