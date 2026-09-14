import Searchbar from "@/components/Search-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth/auth";
import { Bell, Plus, Search } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="font-mono text-slate-900">
      <div className="flex items-center  justify-between ">
        <div>
               <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
                <p className="mt-4 text-slate-600">
                Welcome, <span className="font-semibold">{session?.user?.name}</span>
                </p> 
                </div>
            <div className="flex gap-3 mb-16 w-72">
              <Searchbar/>
              <Button variant="outline" className="relative border-slate-200 bg-white p-2 text-slate-500 transition-colors hover:border-primary hover:text-primary">
              <Bell className="w-4 h-4" />
              
            </Button>
              </div>
      
</div>
 <div className="grid grid-cols-4 gap-3">
  <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-sm font-medium text-slate-500">Total companies</span>
        <p className="text-3xl font-bold tracking-tight text-slate-900">482</p>
          </div>      
          <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-sm font-medium text-slate-500">Pending Verification</span>
            <p className="text-3xl font-bold tracking-tight text-slate-900">17</p>
            </div>   
            <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="mb-5 text-slate-500">Active Users</span>
              <p className="text-3xl font-bold tracking-tight text-slate-900">8,8787</p>
            </div>
            <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-sm font-medium text-slate-500">Open Reports</span>
              <p className="text-3xl font-bold text-slate-900">3</p>
            </div>
            <div className="col-span-3 grid h-75 gap-y-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Pending company verification</span>
              <Button variant="outline">View All</Button>
            </div>
            <Separator/>
            <span className="font-medium text-slate-600">koket Technologies</span>
             <Separator/>
             <span className="font-medium text-slate-600">messi solutions</span>
            <Separator/>
             <span className="font-medium text-slate-600">tade tech</span>
            </div>
            <div className="grid rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
           <span className="text-slate-900">Quick Actions</span>
           <Button><Plus/> Add new Company </Button>
           <Button><Plus/> Manage Users </Button>
           <Button><Plus/> Add new Company </Button>
            </div>
            
</div>
  </div>

      
    
  );
}