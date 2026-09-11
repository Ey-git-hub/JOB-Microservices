import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import { auth } from "@/lib/auth/auth";

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div className="font-mono">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <p className="mt-4 text-slate-600">
        Welcome, <span className="font-semibold">{session?.user?.name}</span>
      </p> 
     <div className="flex flex-row gap-5 mt-3 h-40 ">
  {/* <Card className="w-73 shadow-xl" >
    <CardHeader>
      <Badge className="w-65 h-7  ">Add New Company</Badge>
      <CardTitle>

      </CardTitle>
    </CardHeader>
  </Card>
  <Card className="w-73 shadow-xl" >
    <CardHeader>
      <Badge className="w-65 h-7  ">Active Companies List</Badge>
      <CardTitle>

      </CardTitle>
    </CardHeader>
  </Card>
  <Card className="w-73 shadow-xl" >
    <CardHeader>
      <Badge className="w-65 h-8  ">Company Verification &Approval</Badge>
      <CardTitle>

      </CardTitle>
    </CardHeader>
  </Card>
 <Card className="w-73 shadow-xl" >
    <CardHeader>
      <Badge className="w-65 h-7  ">Company Manager </Badge>
      <CardTitle>

      </CardTitle>
    </CardHeader>
  </Card> */}
  
</div>

</div>

      
    
  );
}