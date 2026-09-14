import { auth } from "@/lib/auth/auth";
import { notFound } from "next/navigation";

const sections = {
  companies: {
    title: "Companies",
    description: "Review and manage companies registered on the platform.",
    items: ["Koket Technologies", "Messi Solutions", "Tade Tech"],
  },
  verification: {
    title: "Verification",
    description: "Review companies waiting for approval and verify their accounts.",
    items: ["Koket Technologies", "Messi Solutions", "Tade Tech"],
  },
  users: {
    title: "Users",
    description: "Manage user access and review registered platform users.",
    items: ["Admin users", "Company managers", "Job seekers"],
  },
  reports: {
    title: "Reports",
    description: "Review platform reports that need administrative attention.",
    items: ["Reported company profile", "Suspicious job listing", "User access issue"],
  },
  analytics: {
    title: "Analytics",
    description: "Monitor activity and growth across the platform.",
    items: ["Company growth", "User activity", "Job engagement"],
  },
  "audit-log": {
    title: "Audit Log",
    description: "Track administrative actions across the platform.",
    items: ["User role updated", "Company verification reviewed", "Report resolved"],
  },
  settings: {
    title: "Settings",
    description: "Configure administrative preferences for the platform.",
    items: ["Role permissions", "Notification preferences", "Platform configuration"],
  },
} as const;

type AdminSection = keyof typeof sections;

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const session = await auth();
  const { section } = await params;

  if (!Object.hasOwn(sections, section)) {
    notFound();
  }

  const content = sections[section as AdminSection];

  return (
    <div className="font-mono text-slate-900">
      <h1 className="text-3xl font-bold">{content.title}</h1>
      <p className="mt-4 text-slate-600">
        Welcome, <span className="font-semibold">{session?.user?.name}</span>
      </p>
      <p className="mt-2 text-slate-500">{content.description}</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {content.items.map((item, index) => (
          <div
            className="flex items-center justify-between border-b border-slate-200 p-5 text-slate-700 last:border-b-0"
            key={item}
          >
            <span>{item}</span>
            <span className="text-sm text-primary">{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}