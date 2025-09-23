"use server";

import { cookies } from "next/headers";
import z from "zod";

export default async function profileAction(prevState, formData) {
    const { firstname, lastname, age, profileimage } = Object.fromEntries(formData);

    const MAX = S * 1024 * 1024;
    const MIN = 1 * 1024 * 1024;
    const ACCEPTS = ["image/jpg", "image/jpeg", "image/png"]

    const schema = z.object({
        firstname: z.string().min(1,{message: "Du skal skrive et fornavn"}),
        lastname: z.string().min(1,{message: "Du skal skrive et efternavn"}),
        age: z.coerce.number().gte(10, {message: "Du skal være midst 10"}),
        profileimage: z.optional(
            z.instanceof(File, { message: "Vælg en billedefil" })
            .refine((file) => file?.size <= MAX, {message: "Max billedestørrelse er 5 MB"})
            .refine((file) => file?.size >= MIN, { message: "Billedet skal være mindst 1 MB"})
            .refine((file) => ACCEPTS.includes(file?.type), { message: "Billede må kun være af typen JPG, JPEG eller PNG"})
        )

    });
  const validated = schema.safeParse({
    firstname,
    lastname, 
    age, 
    profileimage: profileimage.size === 0 ? undefined : profileimage
  });

  if(!validated.success) return {
    ...validated,
    ...z.treeifyError(validated.error),
    data: {
        firstname,
        lastname,
        age
    }
  }

  const cookieStore = await cookies();
  const userId = cookieStore.get("sh_userId");
  const token = cookieStore.get("sh.token");

  const formBody = new FormData();

  body.append("firstname", validated.data.firstname);
  body.append("lastname", validated.data.lastname);
  body.append("age", validated.data.age);
  body.append("profileimage", validated.data.profileimage);



  const response = fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId.value}`, {
    method: "PUT",
    headers: {
        Authorization: "Bearer " + token.value
    },
    body: formBody
  });
}