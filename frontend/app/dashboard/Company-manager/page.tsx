// app/dashboard/companies/page.tsx
"use client";
import { useState } from "react";

const dummyCompanies = [
  { id: 1, name: "Nexora Technologies", status: "active", joined: "2026-03-12" },
  { id: 2, name: "Habesha Logistics", status: "pending", joined: "2026-05-01" },
  { id: 3, name: "Zenith Retail Group", status: "flagged", joined: "2026-06-20" },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState("");
  const filtered = dummyCompanies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-xl font-medium mb-4">Companies</h1>
      <input
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 border rounded px-3 py-2 text-sm w-64"
      />
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Name</th>
            <th className="py-2">Status</th>
            <th className="py-2">Joined</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id} className="border-b">
              <td className="py-2">{c.name}</td>
              <td className="py-2 capitalize">{c.status}</td>
              <td className="py-2">{c.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}