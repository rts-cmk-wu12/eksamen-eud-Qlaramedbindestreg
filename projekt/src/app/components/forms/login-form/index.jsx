"use client";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import "./login-form.scss";

export default function LoginForm({ onLogin }) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_AUTH_URL || "http://localhost:4000/auth/token", 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Wrong email or password");
      }

      const data = await response.json();
      
   
      localStorage.setItem('sh_token', data.token);
      localStorage.setItem('sh_userid', data.userId);
      localStorage.setItem('sh_email', email);
      
      
      window.dispatchEvent(new Event('storage'));
      

      toast.success("Logged in successfully!");
      
      onLogin?.({ email, userid: data.userId, token: data.token });
      
    
      setTimeout(() => {
        router.push("/");
      }, 1500); 

    } catch (err) {
      console.error("Login error:", err);
      toast.error(err.message);
      setIsPending(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login__form">
		<label >
			<span>Email</span>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          required 
          defaultValue="priya.patel@swaphub.test" 
        />

        </label>
    <label >
		<span>Password</span>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          required 
          defaultValue="password1234" 
        />
		</label>
        
        <button type="submit" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
      
      <ToastContainer 
        position="top-right"
        autoClose={2000} 
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

// Kilder: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/forms/login-form/index.jsx & https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent & https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage & https://developer.mozilla.org/en-US/docs/Web/API/FormData & https://nextjs.org/docs/app/api-reference/functions/use-router
