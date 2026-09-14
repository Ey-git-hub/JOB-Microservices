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
import { BarChart, BriefcaseBusinessIcon, Building, Building2, Calendar, FileText, FishingRodIcon, Folder, Globe2, Home, Network, Search, Send, Settings2, ShieldCheck, UserRound, Users2 } from "lucide-react";

export function CompanySidebar() {
  return (
    <Sidebar className="absolute mt-20 overflow-hidden rounded-r-2xl border-r border-slate-200 bg-white font-mono text-slate-700 shadow-xl">
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Job Application</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu className="gap-3 mt-5">
                 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Home/><a href="/sign-up"><span>Dashboard</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <BriefcaseBusinessIcon/><a href="/sign-up"><span>Job Postings</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem>  
               
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <FileText/><a href="/sign-up"><span>Applicants</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                 <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Calendar/><a href="/sign-up"><span>Interviews</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Building2/><a href="/sign-up"><span>Company Profile</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <BarChart/><a href="/sign-up"><span>Analytics</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Team
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Users2/><a href="/sign-up"><span>Team</span></a> 
                </SidebarMenuButton>
              </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings2/><a href="/sign-up"><span>Settings</span></a> 
              </SidebarMenuButton>
            </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}