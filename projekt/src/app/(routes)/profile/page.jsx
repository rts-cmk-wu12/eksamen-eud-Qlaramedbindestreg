"use server";

import "./profile.scss";
import { cookies } from "next/headers";

import ProfileForm from "@/app/components/forms/profile-form";
export default async function ProfilePage() {
    const cookieStore = await cookies();
    const userId = cookieStore.get("sh_userId")?.value;
    const token = cookieStore.get("sh_token")?.value;

    if (!userId || !token) {
       return (
        <div>
            <h1>Profile</h1>
            <p>
                You must be logged in to see this page.
            </p>
        </div>
       )
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + `${token}`
        }
      
       
})
if (!response.ok) {
  const text = await response.text();
  console.error("Fetch failed:", response.status, text);
  throw new Error("failed fetch");
}


const profileData = await response.json();
    return (
        <>
        <h1>profil</h1>

        <ProfileForm profileData={profileData}></ProfileForm>
        </>
    )
}