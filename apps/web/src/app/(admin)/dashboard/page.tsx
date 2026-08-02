"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@portfolio/ui/components/card";
import { useQuery } from "@tanstack/react-query";
import { FolderGit2, MessageSquare } from "lucide-react";
import Link from "next/link";

import { orpc } from "@/utils/orpc";

export default function DashboardOverview() {
  const { data: projects = [] } = useQuery(orpc.projects.listAll.queryOptions());
  const { data: messages = [] } = useQuery(orpc.contact.list.queryOptions());

  const unreadMessages = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Bem-vindo ao seu painel de controle.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link href="/dashboard/projects">
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Projetos</CardTitle>
              <FolderGit2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
              <p className="text-xs text-muted-foreground">Projetos cadastrados</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/messages">
          <Card className="transition-colors hover:bg-muted/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mensagens Não Lidas</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadMessages}</div>
              <p className="text-xs text-muted-foreground">De {messages.length} total</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
