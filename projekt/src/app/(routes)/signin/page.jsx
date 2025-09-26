"use client";

import LoginForm from "@/app/components/forms/login-form"
import { useState } from "react"
import RegisterForm from "@/app/components/forms/register-form"
import "./signin.scss";
export default function LoginPage() {
  const  [version, setVersion] = useState("login");
    const [user, setUser] = useState(null);
    return (
       
        <div className="signin__container">
            {version === "login" ? (
              <>
               <LoginForm onLogin={(loggedInUser) => setUser(loggedInUser)}></LoginForm>
               <p className="signin__toggle">
                   Don't have an account?{""}
                   <button type="button" onClick={() => setVersion("register")}>
                    
                      Register
                   </button>
               </p>
              </>

              ) : (
                <>
                <RegisterForm></RegisterForm>
                <p className="signin__toggle">
                Already have an account?{""}
                <button type="button" onClick={() => setVersion("login")}>
                 Sign in
                </button>
                </p>
                </>
            )}
       
        </div>
        
    );
}

//Kilder: fra undervisning: /Users/qlara/Desktop/coding/next/search-field/src/app/(routes)/login/page.jsx & https://react.dev/learn/conditional-rendering