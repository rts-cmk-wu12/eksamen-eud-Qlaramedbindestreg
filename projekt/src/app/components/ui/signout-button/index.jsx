"use client";
import SignOutAction from "./signout-action";
import "./signout-button.scss";
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
    const router = useRouter()
     //Kilde: useRouter https://nextjs.org/docs/app/api-reference/functions/use-router
    const handleSignOut = () => {
            document.cookie = "sh_token=; max-age: 0; path=/";
            document.cookie = "sh_token=; max-age: 0; path=/";
            router.push('/')
        };
        
    return (
        <>
        <button className="signout__button"
        onClick={handleSignOut}
        >
            Sign out
        </button>
        </>
    )
}