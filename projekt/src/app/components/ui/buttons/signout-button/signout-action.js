//Kilde: max age and revalidatePath https://nextjs.org/docs/app/api-reference/functions/cookies & https://nextjs.org/docs/app/api-reference/functions/revalidatePath

"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function signOutAction() {
  const cookieStore = cookies();
  cookieStore.set({ name: "sh_token", value: "", maxAge: 0, path: "/" });
  cookieStore.set({ name: "sh_userid", value: "", maxAge: 0, path: "/" });

  revalidatePath("/"); 
  return { success: true };
}
