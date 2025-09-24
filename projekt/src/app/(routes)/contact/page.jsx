"use client";

import "./contact.scss";
import { useState } from "react";
import z from "zod";
import { toast } from "react-toastify";

	const newsletterSchema = z.object({
		email: z.string().min(1, { message: "Invalid email" }),
	});

    	const contactSchema = z.object({
		name: z.string().min(2, { message: "Name must be minimum 2 characters" }),
        email: z.string().min(1, { message: "Invalid email" }),
        message: z.string().min(10, { message: "Message must be at least 10 letters" }),
	});

export default function ContactPage() {
    const [email, setEmail] = useState("");
    const [newsletterLoading, setNewsletterLoading] = useState(false);

        const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    function handleContactChange(e) {
        setContactForm({...contactForm, [e.target.name]: e.target.value})
    }
      async function handleNewsletterSubmit(e) {
            e.preventDefault();

            const result = newsletterSchema.safeParse({ email });
            if (!result.success) {
                toast.error(result.error.errors[0].message);
                return;
            }
            try {
                setNewsletterLoading(true)
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/newsletter`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify({email})
	});
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Failed signup to newsletter");
        }
        toast.success("Thank you for signing up to our newsletter");
        setEmail( "");

    } catch (err) {
        toast.error(err.message);
    } finally {
        setNewsletterLoading(false)
    }
        }
    function handleContactSubmit(e) {
        e.preventDefault();

        const result = contactSchema.safeParse(contactForm);
        if (!result.success) {
            toast.error(result.error.errors[0].message);
            return;
        }

        toast.success("Your message has been sent");
        setContactForm({name: "", email: "", message: ""});
    }

            
 
    return (
        <>
        <div className="contact__container">
            <h1>Sign up to SwapHubs newsletter</h1>
        <form onSubmit={handleNewsletterSubmit} className="contact__form">

        <input 
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         />
         <button type="submit" disabled={newsletterLoading}>{newsletterLoading ? "Signing up" : "Sign Up"}</button>
        </form>

        <h1>Contact SwapHub</h1>
        <form action={handleContactSubmit} className="contact__form">
            <input type="text"
            name="name"
            placeholder="Your name"
            value={contactForm.name}
            onChange={handleContactChange}
             />

             <input type="email"
             name="email"
             placeholder="Your email"
             value={contactForm.email}
             onChange={handleContactChange}
              />
              <textarea name="message" 
              placeholder="Your message"
              rows="5"
              value={contactForm.message}
              onChange={handleContactChange}></textarea>
        <button type="submit" >Send Message</button>
        </form>
      
      
       </div>
        </>
    )
}