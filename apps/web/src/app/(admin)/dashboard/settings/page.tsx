"use client";

import { Button } from "@portfolio/ui/components/button";
import { Input } from "@portfolio/ui/components/input";
import { Label } from "@portfolio/ui/components/label";
import { Textarea } from "@portfolio/ui/components/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { orpc } from "@/utils/orpc";

export default function AdminSettings() {
  const { data: settings, isLoading } = useQuery(orpc.settings.getAll.queryOptions());
  const updateMutation = useMutation(orpc.settings.update.mutationOptions());

  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSave = async (key: string) => {
    try {
      await updateMutation.mutateAsync({ key, value: formData[key] || "" });
      toast.success(`Configuração salva com sucesso!`);
    } catch (err) {
      toast.error("Erro ao salvar configuração.");
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  if (isLoading) return <div>Carregando...</div>;

  const fields = [
    { key: "hero_title", label: "Hero Title", type: "text" },
    { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
    { key: "about_bio", label: "About Bio", type: "textarea" },
    { key: "github_url", label: "GitHub URL", type: "text" },
    { key: "linkedin_url", label: "LinkedIn URL", type: "text" },
    { key: "contact_email", label: "Contact Email", type: "text" },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">Gerencie informações e textos do site.</p>
      </div>

      <div className="grid gap-6">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col gap-4 rounded-xl border bg-card p-6">
            <div className="space-y-2">
              <Label>{field.label}</Label>
              <p className="text-xs text-muted-foreground">Key: {field.key}</p>
            </div>
            {field.type === "textarea" ? (
              <Textarea
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="min-h-[100px]"
              />
            ) : (
              <Input
                value={formData[field.key] || ""}
                onChange={(e) => handleChange(field.key, e.target.value)}
              />
            )}
            <div className="flex justify-end">
              <Button onClick={() => handleSave(field.key)} disabled={updateMutation.isPending}>
                Salvar {field.label}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
