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
import { Button } from "./ui/button";
import { FishingRodIcon, Home, Network, Search } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="shadow-2xl font-mono  rounded-md rounded-r-2xl overflow-hidden border-r">
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Job Application</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu className="gap-3">
                 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Home></Home><a href="/sign-up"><span>HOME</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Search></Search><a href="/sign-up"><span>FIND JOBS</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem>  
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <a href="/sign-up"><span>Dashboard</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Network></Network><a href="/sign-up"><span>MY NETWORK</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}