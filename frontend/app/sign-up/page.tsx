import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
export default function SignInPage(){
    return(
        <div className="flex h-screen w-screen ">
            <div className="w-1/2 bg-blue-500 flex items-center justify-center">
            <Image className="shadow-3xl round-md"  src="/logo.jpg" alt={"job application logo"} width={300} height={300}/>
            </div>
            <div className="w-screen flex items-center justify-center">
            <Card className="w-1/2 shadow-2xl">
                <CardHeader>
                    <CardTitle className="font-mono">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <Label className="font-mono mb-1" >Name</Label>
                        <Input className="mb-2" name="name" type="text" placeholder="eyob tadesse"/>
                        <Label className="font-mono mb-1">Email</Label>
                        <Input className="mb-2" name="Email" type="email" placeholder="eyob@gmail.com" autoComplete="off"/>
                        <Label className="font-mono mb-1">Password</Label>
                        <Input className="mb-2" name="Password" type="Password" autoComplete="off" minLength={8}/>
                        <div className="flex bg-black items-center justify-center rounded-md ">
                        <Link href="/dashboard">
                        <Button className="flex font-mono justify-stretch" type="submit">Sign Up</Button>
                        </Link></div>

                    </form>
                </CardContent>
            </Card>
            
            </div>
        </div>
    );
}