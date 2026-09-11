import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
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
      {/* <div className="mt-6 rounded-lg border p-4 bg-slate-50"> */}
        {/* <h2 className="text-lg font-semibold">Your Roles</h2> */}
        {/* <div className="mt-2 flex gap-2">
          {session?.user?.roles?.map((role) => (
            <span
              key={role}
              className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
            >
              {role}
            </span>
          ))}
        </div> */}
      {/* </div> */}
      
        <div className="flex gap-2 mt-3">
      <Badge className="w-73 h-5  ">Add New Company</Badge>
      <Badge className="w-73 h-5 ml-3">Company List</Badge>
      <Badge className="w-73 h-5 ml-3">Edit Admin Info</Badge>
      </div>
      
     <div className="flex flex-row gap-5 mt-2 h-40 ">
  <Card className="w-73 shadow-xl" />
  <Card className="w-73 shadow-xl" />
  <Card className="w-73 shadow-xl" />
</div>

</div>

      
    
  );
}