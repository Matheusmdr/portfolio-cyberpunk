"use client";

import { Button } from "@portfolio/ui/components/button";
import { Checkbox } from "@portfolio/ui/components/checkbox";
import { Input } from "@portfolio/ui/components/input";
import { Label } from "@portfolio/ui/components/label";
import { Textarea } from "@portfolio/ui/components/textarea";
import { Attachment, AttachmentActions, AttachmentAction, AttachmentContent, AttachmentDescription, AttachmentMedia, AttachmentTitle, AttachmentTrigger } from "@portfolio/ui/components/attachment";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { UploadCloud, X, Image as ImageIcon } from "lucide-react";
import { uploadFileToSupabase } from "@portfolio/supabase";

import { orpc } from "@/utils/orpc";

type Project = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  coverImage?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  techStack?: string[] | null;
  featured?: boolean;
  sortOrder?: number;
  status?: "draft" | "published";
};

export default function ProjectForm({ initialData }: { initialData?: Project }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createMutation = useMutation({
    ...orpc.projects.create.mutationOptions(),
    onSuccess: () => {
      toast.success("Projeto criado!");
      queryClient.invalidateQueries({ queryKey: orpc.projects.listAll.queryKey() });
      router.push("/dashboard/projects");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao criar projeto.");
    },
  });

  const updateMutation = useMutation({
    ...orpc.projects.update.mutationOptions(),
    onSuccess: () => {
      toast.success("Projeto atualizado!");
      queryClient.invalidateQueries({ queryKey: orpc.projects.listAll.queryKey() });
      router.push("/dashboard/projects");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao atualizar projeto.");
    },
  });

  const form = useForm({
    defaultValues: initialData || {
      title: "",
      slug: "",
      description: "",
      longDescription: "",
      coverImage: "",
      liveUrl: "",
      repoUrl: "",
      techStack: [] as string[],
      featured: false,
      sortOrder: 0,
      status: "draft" as "draft" | "published",
    },
    onSubmit: async ({ value }) => {
      if (initialData?.id) {
        await updateMutation.mutateAsync({ id: initialData.id, ...value });
      } else {
        await createMutation.mutateAsync(value);
      }
    },
  });

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        <form.Field name="title">
          {(field) => (
            <div className="space-y-2">
              <Label>Título</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        <form.Field name="slug">
          {(field) => (
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-2">
            <Label>Descrição Curta</Label>
            <Textarea
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="longDescription">
        {(field) => (
          <div className="space-y-2">
            <Label>Descrição Longa</Label>
            <Textarea
              value={field.state.value || ""}
              onChange={(e) => field.handleChange(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="liveUrl">
          {(field) => (
            <div className="space-y-2">
              <Label>Live URL</Label>
              <Input
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
        <form.Field name="repoUrl">
          {(field) => (
            <div className="space-y-2">
              <Label>Repository URL</Label>
              <Input
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="coverImage">
        {(field) => (
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex flex-col gap-2">
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  try {
                    setUploadState("uploading");
                    // Assuming bucket name is from NEXT_PUBLIC_SUPABASE_BUCKET or default to "cyberpunk-portfolio"
                    const bucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET || "cyberpunk-portfolio";
                    const path = `projects/${Date.now()}-${file.name}`;
                    const url = await uploadFileToSupabase(bucket, file, path);
                    field.handleChange(url);
                    setUploadState("done");
                    toast.success("Imagem enviada com sucesso!");
                  } catch (err: any) {
                    setUploadState("error");
                    toast.error("Erro ao enviar imagem: " + err.message);
                  }
                }}
              />
              
              {!field.state.value && uploadState !== "uploading" ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-input bg-transparent hover:bg-muted/50 transition-colors"
                >
                  <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Clique para enviar uma imagem</span>
                </div>
              ) : (
                <Attachment state={uploadState} className="w-full h-24">
                  <AttachmentMedia variant={field.state.value ? "image" : "icon"}>
                    {field.state.value ? (
                      <img src={field.state.value} alt="Cover" />
                    ) : (
                      <ImageIcon />
                    )}
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>
                      {field.state.value ? "Imagem carregada" : "Enviando imagem..."}
                    </AttachmentTitle>
                    <AttachmentDescription>
                      {uploadState === "uploading" ? "Fazendo upload para o Supabase..." : "URL da imagem vinculada"}
                    </AttachmentDescription>
                  </AttachmentContent>
                  <AttachmentActions>
                    {field.state.value && uploadState !== "uploading" && (
                      <AttachmentAction
                        variant="destructive"
                        onClick={() => {
                          field.handleChange("");
                          setUploadState("idle");
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                      >
                        <X />
                      </AttachmentAction>
                    )}
                  </AttachmentActions>
                </Attachment>
              )}
              
              <Input
                placeholder="Ou cole a URL da imagem aqui..."
                value={field.state.value || ""}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          </div>
        )}
      </form.Field>

      <form.Field name="techStack">
        {(field) => (
          <div className="space-y-2">
            <Label>Tech Stack (comma separated)</Label>
            <Input
              value={field.state.value?.join(", ") || ""}
              onChange={(e) =>
                field.handleChange(
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                )
              }
            />
          </div>
        )}
      </form.Field>

      <div className="flex gap-6">
        <form.Field name="featured">
          {(field) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={field.state.value}
                onCheckedChange={(checked) => field.handleChange(checked === true)}
              />
              <Label htmlFor="featured">Featured</Label>
            </div>
          )}
        </form.Field>
        <form.Field name="status">
          {(field) => (
            <div className="flex items-center gap-2 space-y-2">
              <Label>Status</Label>
              <select
                className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value as any)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          )}
        </form.Field>
      </div>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            disabled={
              !canSubmit || isSubmitting || createMutation.isPending || updateMutation.isPending
            }
          >
            {isSubmitting || createMutation.isPending || updateMutation.isPending
              ? "Salvando..."
              : "Salvar Projeto"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
