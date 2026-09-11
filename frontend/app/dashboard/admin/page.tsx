import Searchbar from "@/components/Search-bar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth/auth";
import { Search } from "lucide-react";

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
            <div className="mb-16 w-72">
              <Searchbar/>
              </div>
              
            
     
    

</div>

  </div>

      
    
  );
}