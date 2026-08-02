import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@portfolio/ui/components/button";
import ProjectForm from "@/components/project-form";

export default function NewProject() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/projects">
          <Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Novo Projeto</h1>
          <p className="text-muted-foreground">Preencha os dados do seu novo projeto.</p>
        </div>
      </div>
      <div className="bg-card rounded-xl border p-6">
        <ProjectForm />
      </div>
    </div>
  );
}
