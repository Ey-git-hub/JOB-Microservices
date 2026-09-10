import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono gap-4">
      <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
      <p className="text-lg text-slate-600">
        You do not have permission to view this page.
      </p>
      <Link href="/">
        <Button>Go to Home</Button>
      </Link>
    </div>
  );
}

