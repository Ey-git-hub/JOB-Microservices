import { auth } from "@/lib/auth/auth";
import { BackendError, getCompaniesDirect } from "@/lib/api/backend";
import { notFound } from "next/navigation";
import { CompanyManager } from "./company-manager";

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

type Company = {
  id: number;
  name: string;
  location: string;
  description: string;
};

export default async function AdminSectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ message?: string }>;
}) {
  const session = await auth();
  const { section } = await params;
  const { message } = await searchParams;

  if (!Object.hasOwn(sections, section)) {
    notFound();
  }

  const content = sections[section as AdminSection];
  let items: readonly string[] = content.items;
  let companies: Company[] = [];
  let companyError: string | null = null;

  if (section === "companies") {
    try {
      const fetchedCompanies = await getCompaniesDirect<Company[]>();
      items = fetchedCompanies.map((company) => company.name);
      companies = fetchedCompanies;
    } catch (error) {
      companyError = error instanceof BackendError
        ? error.message
        : "Company service is unavailable";
    }
  }

  return (
    <div className="font-mono text-slate-900">
      <h1 className="text-3xl font-bold">{content.title}</h1>
      <p className="mt-4 text-slate-600">
        Welcome, <span className="font-semibold">{session?.user?.name}</span>
      </p>
      <p className="mt-2 text-slate-500">{content.description}</p>

      {section === "companies" && message && (
        <p className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
          {message}
        </p>
      )}

      {section === "companies" && !companyError && (
        <CompanyManager companies={companies} />
      )}

      {companyError && (
        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
          Could not load companies directly from companyms: {companyError}
        </p>
      )}

      {section !== "companies" && (
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {items.map((item, index) => (
            <div
              className="flex items-center justify-between border-b border-slate-200 p-5 text-slate-700 last:border-b-0"
              key={item}
            >
              <span>{item}</span>
              <span className="text-sm text-primary">{index + 1}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}