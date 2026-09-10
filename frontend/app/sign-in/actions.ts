"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/sign-in?error=invalid");
    }

    throw error;
  }
}