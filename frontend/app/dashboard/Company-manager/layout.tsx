import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { CompanySidebar } from "@/components/companymanager-sidebar";

export default async function CompanyManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Defense-in-depth: verify company-manager role server-side
  if (!session?.user?.roles?.includes("company-manager")) {
    redirect("/unauthorized");
  }

  return (
    <SidebarProvider>
      <CompanySidebar />
      <main className="flex-1">
        <div className="flex h-12 items-center border-b px-4">
          <SidebarTrigger />
        </div>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}

