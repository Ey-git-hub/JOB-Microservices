import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { authenticate } from "./actions";

export default async function SignInPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
        const { error } = await searchParams;

        return (
        <div className="flex h-screen w-screen">
            <div className="dark:bg-black w-1/2 flex items-center justify-center">
            <Image className="shadow-3xl round-md"  src="/logo.jpg" alt={"job application logo"} width={300} height={300}/>
            </div>
            <div className="w-screen flex items-center justify-center">
            <Card className="w-1/2 shadow-2xl">
                <CardHeader>
                    <CardTitle className="font-mono">SignIn</CardTitle>
                </CardHeader>
                <CardContent>
                                        <form action={authenticate}>
                        <Label className="font-mono mb-1">Email</Label>
                                                <Input className="mb-2" name="email" type="email" placeholder="eyob@gmail.com" autoComplete="email" required/>
                        <Label className="font-mono mb-1">Password</Label>
                                                <Input className="mb-2" name="password" type="password" autoComplete="current-password" minLength={8} required/>
                                                {error && (
                                                    <p className="mb-2 text-sm text-red-600">Invalid email or password.</p>
                                                )}
                                                <div className="flex bg-black items-center justify-center rounded-md">
                                                    <Button className="flex font-mono justify-stretch" type="submit">Sign In</Button>
                                                </div>

                    </form>
                </CardContent>
            </Card>
            
            </div>
        </div>
    );
}