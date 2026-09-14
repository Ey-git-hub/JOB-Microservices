"use server";

import {
  createCompany,
  deleteCompany,
  updateCompany,
} from "@/lib/api/backend";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function getCompanyData(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
  };
}

function validateCompany(data: ReturnType<typeof getCompanyData>) {
  if (!data.name || !data.location || !data.description) {
    throw new Error("Name, location, and description are required.");
  }
}

export async function createCompanyAction(formData: FormData) {
  const data = getCompanyData(formData);
  validateCompany(data);
  await createCompany(data);
  revalidatePath("/dashboard/admin/companies");
  redirect("/dashboard/admin/companies?message=Company%20created%20successfully");
}

export async function updateCompanyAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const data = getCompanyData(formData);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid company id.");
  }

  validateCompany(data);
  await updateCompany(id, data);
  revalidatePath("/dashboard/admin/companies");
  redirect("/dashboard/admin/companies?message=Company%20updated%20successfully");
}

export async function deleteCompanyAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid company id.");
  }

  await deleteCompany(id);
  revalidatePath("/dashboard/admin/companies");
  redirect("/dashboard/admin/companies?message=Company%20deleted%20successfully");
}