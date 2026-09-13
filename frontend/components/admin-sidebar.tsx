"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart, Building2Icon, FlagIcon, Home, Settings, SquareArrowOutDownRightIcon, Users, VerifiedIcon } from "lucide-react";

const overviewItems = [
  { label: "Dashboard", href: "/dashboard/admin", icon: Home },
  { label: "Companies", href: "/dashboard/admin/companies", icon: Building2Icon },
  { label: "Verification", href: "/dashboard/admin/verification", icon: VerifiedIcon },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Reports", href: "/dashboard/admin/reports", icon: FlagIcon },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart },
];

const systemItems = [
  { label: "Audit Log", href: "/dashboard/admin/audit-log", icon: SquareArrowOutDownRightIcon },
  { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="absolute mt-13 overflow-hidden rounded-r-2xl border-r font-mono shadow-2xl">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="mt-2 gap-3">
              {overviewItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === "/dashboard/admin"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={isActive}
                      render={<Link href={item.href} />}
                    >
                        <Icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => {
                const Icon = item.icon;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={pathname.startsWith(item.href)}
                      render={<Link href={item.href} />}
                    >
                        <Icon />
                        <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}