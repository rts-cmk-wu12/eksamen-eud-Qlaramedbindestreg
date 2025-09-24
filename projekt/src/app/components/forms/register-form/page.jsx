"use client";

import "./register.scss";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterForm() {
    const [form, setForm] = useState({
        firstName:"",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        if (form.password !== form.confirmPassword) {
            toast.error("passwords don't match");
            setLoading(false);
            return;
        }
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, {
		method: "POST",
		headers: {
			"content-type": "application/json"
		},
		body: JSON.stringify(form)
	});
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Failed user creation");
        }
        toast.success("User created");
        setForm({ firstName: "", lastName: "", email: "", password: "", confirmPassword: ""});
    } catch (err) {
        toast.error(err.message);
    } finally {
        setLoading(false)
    }
    }


    return (
        <>

            <h1>Create an account</h1>
            <form onSubmit={handleSubmit} className="register__form">
                <input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange}/>
                <input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange}/>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}/>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange}/>
               <button type="submit" disabled={loading}>{loading ? "Creating" : "Create Account"}</button>

            </form>


        </>
    )

}