import AdminSidebar from "@/components/admin-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { auth } from "@portfolio/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-[65px] items-center justify-between border-b bg-card px-6">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-xl font-bold">
            Admin Panel
          </Link>
          <span className="hidden text-sm text-muted-foreground md:inline-block">
            / {session.user.name}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline"
          >
            Ver Site
          </Link>
          <ModeToggle />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
