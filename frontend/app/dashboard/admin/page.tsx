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
    <div className="font-mono">
      <div className="flex items-center  justify-between ">
        <div>
               <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
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
   <div className="p-5 bg-[#121215] border border-slate-800/80 rounded-xl min-h-[40px]">
            <span className=" text-sm font-medium text-slate-400">Total companies</span>
            <p className="text-3xl font-bold text-white tracking-tight">482</p>
          </div>      
          <div className="bg-[#121215] min-h-[40px] rounded-xl p-5">
            <span className="text-sm font-medium text-slate-400">Pending Verification</span>
            <p className="text-3xl font-bold text-white tracking-tight text-slate-400">17</p>
            </div>   
            <div className="bg-[#121215] min-h-[40px] p-5 rounded-xl">
              <span className="text-slate-400 mb-5 ">Active Users</span>
              <p className="text-white text-3xl font-bold tracking-tight">8,8787</p>
            </div>
            <div className="bg-[#121215] min-h-[40px] p-5 rounded-xl">
              <span className="text-sm font-medium  text-slate-400">Open Reports</span>
              <p className="font-bold text-3xl text-white">3</p>
            </div>
            <div className="grid bg-[#121215] h-75 p-5 rounded-xl col-span-3 gap-y-1 ">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-medium">Pending company verification</span>
              <Button>View All</Button>
            </div>
            <Separator/>
            <span className="text-slate-400 font-medium ">koket Technologies</span>
             <Separator/>
             <span className="text-slate-400 font-medium ">messi solutions</span>
            <Separator/>
            <span className="text-slate-400 font-medium ">tade tech</span>
            </div>
            <div className="grid p-5 bg-[#121215] rounded-xl">
           <span className="text-white">Quick Actions</span>
           <Button><Plus/> Add new Company </Button>
           <Button><Plus/> Manage Users </Button>
           <Button><Plus/> Add new Company </Button>
            </div>
            
</div>
  </div>

      
    
  );
}