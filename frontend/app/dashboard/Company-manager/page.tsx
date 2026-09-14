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
               <h1 className="text-3xl font-bold">Company Dashboard</h1>
                <p className="mt-4 text-slate-600">
                Welcome, <span className="font-semibold">{session?.user?.name}</span>
                </p> 
                </div>
            <div className="flex gap-3 mb-16 w-72">
              <Searchbar/>
              <Button className="p-2 rounded-lg bg-white border border-gray-200 text-slate-400 hover:text-blue  transition-colors relative">
              <Bell className="w-4 h-4" />
              
            </Button>
              </div>
      
</div>
 <div className="grid grid-cols-4 gap-3">
  <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <span className="text-sm font-medium text-slate-500">Active Postings</span>
        <p className="text-3xl font-bold tracking-tight text-slate-900">482</p>
          </div>      
          <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-sm font-medium text-slate-500">New Application</span>
            <p className="text-3xl font-bold tracking-tight text-slate-900">17</p>
            </div>   
            <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="mb-5 text-slate-500">Interviews This Week</span>
              <p className="text-3xl font-bold tracking-tight text-slate-900">8,8787</p>
            </div>
            <div className="min-h-[40px] rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-sm font-medium text-slate-500">Profile completion</span>
              <p className="text-3xl font-bold text-slate-900">3</p>
            </div>
            <div className="col-span-3 grid h-75 gap-y-1 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Recent Applications</span>
              <Button variant="outline">View All</Button>
            </div>
            <Separator/>
            <span className="font-medium text-slate-600">koket Technologies</span>
             <Separator/>
             <span className="font-medium text-slate-600">messi solutions</span>
            <Separator/>
             <span className="font-medium text-slate-600">tade tech</span>
            </div>
            {/* <div className="grid p-5 bg-[#121215] rounded-xl">
           <span className="text-white">Quick Actions</span>
           <Button><Plus/> Add new Company </Button>
           <Button><Plus/> Manage Users </Button>
           <Button><Plus/> Add new Company </Button>
            </div> */}
            
</div>
  </div>

      
    
  );
}