"use server";

import { cookies } from "next/headers";
import z from "zod";

export default async function profileAction(prevState, formData) {
    const { email, password, firstname, lastname, age } = Object.fromEntries(formData);

    const schema = z.object({
           email: z.string().min(1,{message: "Invalid email"}),
        password: z.string().min(6,{message: "Password must be at least 6 characters"}),
     
        firstname: z.string().min(1,{message: "Du skal skrive et fornavn"}),
        lastname: z.string().min(1,{message: "Du skal skrive et efternavn"}),
   

    });
    const validated = schema.safeParse({
        email,
        password,
        firstname,
        lastname,
        age,
    });

    if (!validated.success) return {
        ...validated,
        ...z.treeifyError(validated.error),
        data: {
            email,
            password,
            firstname,
            lastname,
           
        }
    }

    const cookieStore = await cookies();
    const userid = cookieStore.get("sh_userid");
    const token = cookieStore.get("sh_token");

    if (!userid || !token) {
        throw new Error ("You are not logged in");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userid.value}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(validated),
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`failed fetch: ${err}`)
    }
    return true ;
}

 //Kilde: Fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/forms/profil-form/profile-action.js
   
