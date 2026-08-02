"use client";

import { Button } from "@portfolio/ui/components/button";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { orpc } from "@/utils/orpc";

export default function AdminProjects() {
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading } = useQuery(orpc.projects.listAll.queryOptions());

  const deleteMutation = useMutation({
    ...orpc.projects.delete.mutationOptions(),
    onSuccess: () => {
      toast.success("Projeto deletado com sucesso!");
      queryClient.invalidateQueries({ queryKey: orpc.projects.listAll.queryKey() });
    },
  });

  const toggleStatusMutation = useMutation({
    ...orpc.projects.update.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orpc.projects.listAll.queryKey() });
      toast.success("Status atualizado!");
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground">Gerencie seus projetos do portfólio.</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Projeto
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Título
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Destaque
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                  Ordem
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    Carregando...
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-center">
                    Nenhum projeto encontrado.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">{project.title}</td>
                    <td className="p-4 align-middle">
                      <button
                        onClick={() =>
                          toggleStatusMutation.mutate({
                            id: project.id,
                            status: project.status === "published" ? "draft" : "published",
                          })
                        }
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          project.status === "published"
                            ? "bg-primary text-primary-foreground hover:bg-primary/80"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {project.status === "published" ? "Publicado" : "Rascunho"}
                      </button>
                    </td>
                    <td className="p-4 align-middle">{project.featured ? "Sim" : "Não"}</td>
                    <td className="p-4 align-middle">{project.sortOrder}</td>
                    <td className="flex justify-end gap-2 p-4 text-right align-middle">
                      <Link href={`/dashboard/projects/${project.id}`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => {
                          if (confirm("Tem certeza que deseja excluir?")) {
                            deleteMutation.mutate({ id: project.id });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
