"use client";

import { Button } from "@portfolio/ui/components/button";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CheckCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { orpc } from "@/utils/orpc";

export default function AdminMessages() {
  const queryClient = useQueryClient();
  const { data: messages = [], isLoading } = useQuery(orpc.contact.list.queryOptions());

  const markReadMutation = useMutation({
    ...orpc.contact.markAsRead.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orpc.contact.list.queryKey() });
      toast.success("Mensagem marcada como lida!");
    },
  });

  const deleteMutation = useMutation({
    ...orpc.contact.delete.mutationOptions(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orpc.contact.list.queryKey() });
      toast.success("Mensagem deletada!");
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
        <p className="text-muted-foreground">Mensagens recebidas pelo formulário de contato.</p>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <p>Carregando...</p>
        ) : messages.length === 0 ? (
          <p className="text-muted-foreground">Nenhuma mensagem encontrada.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`rounded-xl border p-6 ${
                message.read ? "bg-card opacity-70" : "border-primary/20 bg-muted/30"
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold">
                    {message.subject}
                    {!message.read && (
                      <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
                        Nova
                      </span>
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    De: {message.name} ({message.email})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {!message.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markReadMutation.mutate({ id: message.id })}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" /> Marcar como lida
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      if (confirm("Deletar mensagem?")) {
                        deleteMutation.mutate({ id: message.id });
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="whitespace-pre-wrap rounded-lg border bg-background p-4">
                {message.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
