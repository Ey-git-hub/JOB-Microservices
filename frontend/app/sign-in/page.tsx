import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage(){
    return(
        <div className="flex h-screen w-screen ">
            <div className="w-1/2 bg-blue-500 flex items-center justify-center">sign in</div>
            <div className="w-1/2 flex items-center justify-center">
            <Card className="w-1/2 shadow-2xl">
                <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <Label>Name</Label>
                        <Input name="name" type="text" placeholder="eyob tadesse"/>
                        <Label>Email</Label>
                        <Input name="Email" type="email" placeholder="eyob@gmail.com" autoComplete="off"/>
                        <Label>Password</Label>
                        <Input name="Password" type="Password" autoComplete="off" minLength={8}/>
                        <Link href="/dashboard">
                        <Button type="submit">Sign In</Button>
                        </Link>

                    </form>
                </CardContent>
            </Card>
            
            </div>
        </div>
    );
}