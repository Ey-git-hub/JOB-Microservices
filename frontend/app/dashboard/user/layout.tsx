// app/dashboard/layout.tsx
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Defense-in-depth: verify admin role server-side
  if (!session?.user?.roles?.includes("admin")) {
    redirect("/unauthorized");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1">
        <div className="flex h-12 items-center border-b px-4">
          <SidebarTrigger />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}