"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export default async function loginAction(prevState, formData) {
    //Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/forms/login-form/login-action.js
	const { email, password } = Object.fromEntries(formData);

	const schema = z.object({
        email: z.string().min(1, { message: "Du skal udfylde et brugernavn" }),
		password: z.string().min(1, { message: "Du skal udfylde en adgangskode" })
	});

	const validated = schema.safeParse({
		email,
		password
	});

	if (!validated.success) return {
		...validated,
		...z.treeifyError(validated.error),
		data: {
			email,
			password
		}
	}

	const response = await fetch(`${process.env.API_AUTH_URL}`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify({
			email: validated.data.email,
			password: validated.data.password
		})
	});

	if (!response.ok) return {
		success: false,
		errors: ["Forkert e-mail eller adganskode"],
		data: {
			email,
			password
		}
	}

	const json = await response.json();

	const cookieStore = await cookies();

	cookieStore.set({
		name: "sh_token",
		value: json.token,
		path: "/",
		httpOnly: true,
	});

	cookieStore.set({
		name: "sh_userId",
		value: String(json.userId),
      
	});



	redirect("/");
}