"use server";

import "./profile.scss";
import { cookies } from "next/headers";

import ProfileForm from "@/app/components/forms/profile-form";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const userid = cookieStore.get("sh_userid")?.value;
    const token = cookieStore.get("sh_token")?.value;

    if (!userid || !token) {
        return (
            <div>
                <h1>Profile</h1>
                <p>
                    You must be logged in to see this page.
                </p>
            </div>
        )
    }
    let profileData = null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userid}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }


    })
    if (!response.ok) {
        const text = await response.text();
        if (response.status === 401 ||
            text.includes("jwt expired")) {
            return (
                <div>
                    <h1>Profile</h1>
                    <p>Your token expired. Please log in again.</p>
                </div>
            )
        }

        throw new Error("failed fetch");
    }


    profileData = await response.json();
    return (
        <>
            <h1>Profile</h1>

            <ProfileForm profileData={profileData}></ProfileForm>
        </>
    )
}