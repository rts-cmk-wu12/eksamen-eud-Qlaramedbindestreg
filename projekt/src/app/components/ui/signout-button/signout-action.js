"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignOutAction() {
    //Kilde: max age and redirect https://nextjs.org/docs/app/api-reference/functions/cookies & https://nextjs.org/docs/app/api-reference/functions/redirect
    const cookieStore = await cookies();

    cookieStore.set({name: "sh_token", value: "",  maxAge: 0, path: "/"})
    cookieStore.set({name: "sh_userid", value: "",  maxAge: 0, path: "/"})
 

    redirect("/");
}