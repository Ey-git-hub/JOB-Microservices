import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/user-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Defense-in-depth: verify user role server-side
  if (!session?.user?.roles?.includes("user")) {
    redirect("/unauthorized");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <div className="flex h-12 items-center border-b px-4">
          <SidebarTrigger />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}

