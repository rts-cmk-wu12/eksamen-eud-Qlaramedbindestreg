"use client";

import "./contact.scss";
import { useState } from "react";
import z from "zod";

	const schema = z.object({
		email: z.string().email("ugyldig email"),
	});

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const result = schema.safeParse({ email });
        if (!result.success) {
            setError(result.error.errors[0].message);
            setSuccess(false);
            return;
        }
        setError(null);
        setSuccess(true);

    }
 
    return (
        <>
        <div className="contact__container">
            <h1>Sign up to SwapHubs newsletter</h1>
        <form onSubmit={handleSubmit} className="contact__form">

        <input 
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         />
         <button type="submit">Sign up</button>
        </form>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Thank you for signing up to our newsletter</p>}
        </div>
        </>
    )
}