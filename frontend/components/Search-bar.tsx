import { Search } from "lucide-react";
import { Input } from "./ui/input";

export default function Searchbar(){
    return <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search companies, users..."
        className="pl-9 bg-background"
      />
    </div>
}