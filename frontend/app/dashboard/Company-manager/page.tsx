import { auth } from "@/lib/auth/auth";

export default async function CompanyManagerDashboard() {
  const session = await auth();

  return (
    <div className="font-mono">
      <h1 className="text-3xl font-bold">Company Manager Dashboard</h1>
      <p className="mt-4 text-slate-600">
        Welcome, <span className="font-semibold">{session?.user?.name}</span>
      </p>
      <div className="mt-6 rounded-lg border p-4 bg-slate-50">
        <h2 className="text-lg font-semibold">Your Roles</h2>
        <div className="mt-2 flex gap-2">
          {session?.user?.roles?.map((role) => (
            <span
              key={role}
              className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800"
            >
              {role}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

