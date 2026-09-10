import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  const roles = session?.user?.roles ?? [];

  if (roles.includes("admin")) {
    redirect("/dashboard/admin");
  }

  if (roles.includes("company-manager")) {
    redirect("/dashboard/Company-manager");
  }

  if (roles.includes("user")) {
    redirect("/dashboard/user");
  }

  redirect("/unauthorized");
}