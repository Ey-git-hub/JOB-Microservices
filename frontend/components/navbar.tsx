import { Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Navbar(){
    return <div className="flex flex-row font-mono bg-white h-8 w-extend mt-3 justify-between px-3">
<div className="flex flex-col-2 gap-4">
    <Button><Briefcase/>Job Application</Button>
</div>
<div className="flex gap-3">
    <Button>Login</Button>
    <Button><Link href="/sign-up">SignUp</Link></Button>
</div>
    </div>
}