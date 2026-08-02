"use client";

import { Input } from "@portfolio/ui/components/input";
import { Label } from "@portfolio/ui/components/label";
import { Textarea } from "@portfolio/ui/components/textarea";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { AlertOctagon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { orpc } from "@/utils/orpc";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const sendMutation = useMutation({
    ...orpc.contact.send.mutationOptions(),
    onSuccess: () => {
      setSubmitted(true);
      toast.success("PAYLOAD_DELIVERED");
    },
    onError: (err) => {
      toast.error(err.message || "DELIVERY_FAILED");
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    onSubmit: async ({ value }) => {
      await sendMutation.mutateAsync(value);
    },
  });

  if (submitted) {
    return (
      <div className="bg-[var(--cp-surface)] border-l-4 border-[var(--cp-cyan)] flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
        <div className="w-16 h-16 bg-[var(--cp-cyan)] flex items-center justify-center text-black mb-6 rotate-45">
          <div className="-rotate-45 font-display text-2xl font-bold">OK</div>
        </div>
        <h3 className="font-display mb-2 text-3xl font-bold uppercase text-[var(--cp-cyan)]">
          MENSAGEM ENVIADA
        </h3>
        <p className="font-mono mb-8 text-sm text-[var(--cp-text-primary)]">
          Recebi seu contato. Responderei o mais rápido possível.
        </p>
        <button
          className="cp-btn-primary"
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
        >
          ENVIAR OUTRA MENSAGEM
        </button>
      </div>
    );
  }

  return (
    <form
      className="bg-[var(--cp-surface)] p-8 border border-[var(--cp-red-dark)] relative"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className="absolute top-0 left-0 w-24 h-1 bg-[var(--cp-red)]" />
      
      <div className="mb-6 flex items-center gap-2 border-b border-[var(--cp-red-dark)] pb-4 font-mono text-xs text-[var(--cp-red)] uppercase font-bold">
        <AlertOctagon size={16} /> FORMULÁRIO DE CONTATO
      </div>

      <div className="space-y-6">
        <form.Field name="name">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="font-mono text-[10px] uppercase text-[var(--cp-text-muted)] tracking-wider">
                NOME
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="cp-input"
                placeholder="Seu nome"
              />
            </div>
          )}
        </form.Field>
        
        <form.Field name="email">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="font-mono text-[10px] uppercase text-[var(--cp-text-muted)] tracking-wider">
                E-MAIL
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="cp-input"
                placeholder="seu@email.com"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="subject">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="font-mono text-[10px] uppercase text-[var(--cp-text-muted)] tracking-wider">
                ASSUNTO
              </Label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="cp-input"
                placeholder="Qual o motivo do contato?"
              />
            </div>
          )}
        </form.Field>

        <form.Field name="message">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name} className="font-mono text-[10px] uppercase text-[var(--cp-text-muted)] tracking-wider">
                MENSAGEM
              </Label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="cp-input min-h-[140px]"
                placeholder="Escreva sua mensagem aqui..."
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <div className="mt-8 pt-4 border-t border-[var(--cp-red-dark)] flex justify-end">
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting || sendMutation.isPending}
              className="cp-btn-primary"
            >
              {isSubmitting || sendMutation.isPending ? "ENVIANDO..." : "ENVIAR MENSAGEM"}
            </button>
          </div>
        )}
      </form.Subscribe>
    </form>
  );
}
