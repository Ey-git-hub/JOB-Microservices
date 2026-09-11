import Searchbar from "@/components/Search-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth/auth";
import { Bell, Search } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="font-mono">
      <div className="flex items-center  justify-between ">
        <div>
               <h1 className="text-3xl font-bold">Admin Dashboard</h1>
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
 <div className="flex gap-3 ">
   <div className="p-5 bg-[#121215] border border-slate-800/80 rounded-xl w-40">
            <span className="text-sm font-medium text-slate-400">Total companies</span>
            <p className="text-3xl font-bold text-white tracking-tight">482</p>
          </div>      
          <div className="bg-[#121215] w-40 rounded-xl p-5">
            <span className="text-sm font-medium text-slate-400">Pending Verification</span>
            <p className="text-3xl font-bold text-white tracking-tight text-slate-400">17</p>
            </div>   
            <div className="bg-[#121215] p-5 rounded-xl">
              <span className="text-slate-400 mb-5 ">Active Users</span>
              <p className="text-white text-3xl font-bold tracking-tight">8,8787</p>
            </div>
            <div className="bg-[#121215] p-5 rounded-xl">
              <span className="text-sm font-medium  text-slate-400">Open Reports</span>
              <p className="font-bold text-3xl text-white">3</p>
            </div>
</div>
  </div>

      
    
  );
}