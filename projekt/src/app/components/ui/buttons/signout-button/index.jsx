 //Kilde: useRouter https://nextjs.org/docs/app/api-reference/functions/use-router & https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html & https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem & https://nextjs.org/docs/app/api-reference/functions/use-router#routerpush & https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
"use client";
import "./signout-button.scss";
import { useRouter } from "next/navigation";

export default function SignOutButton({ onSignOut }) {
  const router = useRouter();

  const handleSignOut = () => {

    localStorage.removeItem("sh_token");
    localStorage.removeItem("sh_userid");
    localStorage.removeItem("sh_email");

  
    window.dispatchEvent(new Event('storage'));

    if (onSignOut) onSignOut();
    router.push("/");
  };

  return (
    <button className="signout__button" onClick={handleSignOut}>
      Sign out
    </button>
  );
}