import { Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <div className="flex flex-row font-mono bg-white h-8 w-extend mt-3 justify-between px-3">
      <div className="flex flex-col-2 gap-4">
        <Link href="/">
          <Button>
            <Briefcase />
            Job Application
          </Button>
        </Link>
      </div>
      <div className="flex gap-3 items-center">
        {session?.user ? (
          <>
            <span className="text-sm text-slate-700">
              {session.user.name}
            </span>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/" });
              }}
            >
              <Button type="submit" className="hover:bg-red-300">
                Sign Out
              </Button>
            </form>
          </>
        ) : (
          <>
            {/* <Link href="/api/auth/signin">
              <Button className="hover:bg-blue-300">Login</Button>
            </Link> */}
            <Link href="/sign-in">
              <Button>SignIn</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}