"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Home, Building2Icon, VerifiedIcon, Users, FlagIcon, BarChart,
  SquareArrowOutDownRightIcon, Settings,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar";

const overviewItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/dashboard/companies", label: "Companies", icon: Building2Icon },
  { href: "/dashboard/verification", label: "Verification", icon: VerifiedIcon },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/reports", label: "Reports", icon: FlagIcon },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart },
];

const systemItems = [
  { href: "/dashboard/audit-log", label: "Audit log", icon: SquareArrowOutDownRightIcon },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="absolute shadow-2xl font-mono rounded-r-2xl overflow-hidden border-r mt-13">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3 mt-2">
              {overviewItems.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    isActive={pathname === href}
                    render={
                      <Link href={href} className="flex flex-row items-center gap-2">
                        <Icon />
                        <span>{label}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map(({ href, label, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton
                    isActive={pathname === href}
                    render={
                      <Link href={href} className="flex flex-row items-center gap-2">
                        <Icon />
                        <span>{label}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}