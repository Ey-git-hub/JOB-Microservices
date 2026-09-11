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
              <Button className="p-2 rounded-lg bg-white border border-gray-200 text-slate-400 hover:text-blue hover:border-slate-700 transition-colors relative">
              <Bell className="w-4 h-4" />
              
            </Button>
              </div>
             
     
    

</div>
 
            

  </div>

      
    
  );
}