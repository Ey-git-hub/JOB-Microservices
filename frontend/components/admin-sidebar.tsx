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
import { BarChart, Building2Icon, FishingRodIcon, FlagIcon, Folder, Home, Network, ReceiptPoundSterling, Search, Settings, SquareArrowOutDownRightIcon, User2, User2Icon, UserRound, Users, VerifiedIcon } from "lucide-react";

export function AdminSidebar() {
  return (
    <Sidebar className="shadow-2xl font-mono  rounded-r-2xl overflow-hidden border-r mt-20">
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel>Overview</SidebarGroupLabel>
        <SidebarGroupContent>
            <SidebarMenu className="gap-3 mt-2">
                 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Home></Home><a href="/sign-up"><span>Dashboard</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                   <Building2Icon/> <a href="/sign-up"><span>Companies</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem>  
               
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                   <VerifiedIcon/>  <a href="/sign-up"><span>Verification</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem> 
                 <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <Users/> <a href="/sign-up"><span>Users</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <FlagIcon/><a href="/sign-up"><span>Reports</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem>  
                <SidebarMenuItem>
                <SidebarMenuButton className="flex flex-col-1 ">
                    <BarChart/> <a href="/sign-up"><span>Analytics</span></a>  
                </SidebarMenuButton>
                </SidebarMenuItem>  
            </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <SquareArrowOutDownRightIcon/><a href="/sign-in">Audit Log</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings/><a href="/sign-in">Settings</a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    
   
  );
}