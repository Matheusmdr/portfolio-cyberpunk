import { PhoneCall, MapPin, Radio } from "lucide-react";

import ContactForm from "@/components/contact-form";
import SectionHeading from "@/components/section-heading";

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl pt-8">
      <SectionHeading subtitle="ENTRE EM CONTATO">
        CONTATO
      </SectionHeading>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.5fr]">
        <div className="space-y-8">
          <div className="bg-[var(--cp-bg)] border border-[var(--cp-red)] text-[var(--cp-red)] p-6 relative overflow-hidden shadow-[inset_0_0_20px_rgba(255,42,75,0.05)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[var(--cp-red-dark)]" />
            <h3 className="font-display text-3xl font-bold uppercase mb-2">
              VAMOS CONVERSAR?
            </h3>
            <p className="font-mono text-xs leading-relaxed opacity-90 uppercase">
              Seja para um projeto novo, uma consultoria ou apenas para dizer um olá.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-[var(--cp-surface)] p-4 border border-[var(--cp-red-dark)] hover:bg-[var(--cp-cyan)] hover:border-[var(--cp-cyan)] group transition-colors cursor-default">
              <div className="text-[var(--cp-red)] group-hover:text-black">
                <PhoneCall size={24} />
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--cp-red)] group-hover:text-black/70 uppercase">
                  E-MAIL
                </p>
                <p className="font-mono text-sm font-bold text-[var(--cp-red)] group-hover:text-black uppercase">
                  matheus.m.rocha@unesp.br
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[var(--cp-surface)] p-4 border border-[var(--cp-red-dark)] hover:bg-[var(--cp-cyan)] hover:border-[var(--cp-cyan)] group transition-colors cursor-default">
              <div className="text-[var(--cp-red)] group-hover:text-black">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--cp-red)] group-hover:text-black/70 uppercase">
                  LOCALIZAÇÃO
                </p>
                <p className="font-mono text-sm font-bold text-[var(--cp-red)] group-hover:text-black uppercase">
                  SÃO PAULO // BRASIL
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-[var(--cp-surface)] p-4 border border-[var(--cp-red-dark)] hover:bg-[var(--cp-cyan)] hover:border-[var(--cp-cyan)] group transition-colors cursor-default">
              <div className="text-[var(--cp-red)] group-hover:text-black">
                <Radio size={24} />
              </div>
              <div>
                <p className="font-mono text-[10px] text-[var(--cp-red)] group-hover:text-black/70 uppercase">
                  DISPONIBILIDADE
                </p>
                <p className="font-mono text-sm font-bold text-[var(--cp-red)] group-hover:text-black uppercase animate-pulse">
                  ABERTO PARA OPORTUNIDADES
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
