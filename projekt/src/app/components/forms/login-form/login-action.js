"use server";
import { cookies } from "next/headers";
import z from "zod";
import { redirect } from "next/navigation";

export default async function loginAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const schema = z.object({
    email: z.string().min(1, { message: "Email must be filled out" }),
    password: z.string().min(1, { message: "Password must be filled out" })
  });

  const validated = schema.safeParse({ email, password });

  if (!validated.success) {
    return {
      ...validated,
      ...z.treeifyError(validated.error)
    };
  }


  const response = await fetch(process.env.API_AUTH_URL || "http://localhost:4000/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!response.ok) {
    return { errors: ["Wrong email or password"] };
  }

  const data = await response.json();

  const cookieStore = await cookies();
  cookieStore.set("sh_token", data.token, { path: "/" });
  cookieStore.set("sh_userid", String(data.userid), { path: "/" }); 

  redirect("/");
}

//Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/forms/login-form/login-action.js
