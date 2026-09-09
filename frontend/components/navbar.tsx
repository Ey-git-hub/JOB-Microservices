import { Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar(){
    return <div className="flex flex-row font-mono bg-white h-8 w-extend mt-3 justify-between px-3">
<div className="flex flex-col-2 gap-4">
   <Link href="/"> <Button><Briefcase/>Job Application</Button></Link>
</div>
<div className="flex gap-3">
    <Link href="/sign-in"><Button className="hover:bg-blue-300">Login</Button></Link>
    <Link href="/sign-up"><Button>SignUp</Button></Link>
</div>
    </div>
}