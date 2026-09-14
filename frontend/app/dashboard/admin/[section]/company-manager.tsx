"use client";

import { useState } from "react";
import { createCompanyAction, deleteCompanyAction, updateCompanyAction } from "./company-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Company = {
  id: number;
  name: string;
  location: string;
  description: string;
};

export function CompanyManager({ companies }: { companies: Company[] }) {
  const [editingId, setEditingId] = useState<number | null>(null);

  return (
    <div className="mt-8 space-y-6">
      <form action={createCompanyAction} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Add company</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <Input name="name" placeholder="Company name" required />
          <Input name="location" placeholder="Location" required />
          <Input name="description" placeholder="Description" required />
        </div>
        <Button className="mt-4" type="submit">Create company</Button>
      </form>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {companies.length === 0 && (
          <p className="p-5 text-slate-500">No companies found.</p>
        )}
        {companies.map((company) => (
          <div className="border-b border-slate-200 p-5 last:border-b-0" key={company.id}>
            {editingId === company.id ? (
              <form action={updateCompanyAction} className="space-y-3">
                <input name="id" type="hidden" value={company.id} />
                <Input defaultValue={company.name} name="name" required />
                <Input defaultValue={company.location} name="location" required />
                <Input defaultValue={company.description} name="description" required />
                <div className="flex gap-2">
                  <Button type="submit">Save changes</Button>
                  <Button onClick={() => setEditingId(null)} type="button" variant="outline">Cancel</Button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{company.name}</h3>
                  <p className="text-sm text-slate-500">{company.location}</p>
                  <p className="mt-1 text-sm text-slate-600">{company.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => setEditingId(company.id)} type="button" variant="outline">Edit</Button>
                  <form action={deleteCompanyAction}>
                    <input name="id" type="hidden" value={company.id} />
                    <Button type="submit" variant="destructive">Delete</Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}