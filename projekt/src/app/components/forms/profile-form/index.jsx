"use client";
import "./profile-form.scss";
import profileAction from "./profile-action";
import { useState } from "react";

export default function ProfileForm({ profileData } ) {
   const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        const formData = new FormData(e.target);

        try {
            await profileAction(formData); 
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        //Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/forms/profil-form/index.jsx
        <div className="profileform__container">
        <form onSubmit={handleSubmit}>

            <div >
                <label>
                    <span>
                        Email
                    </span>
                    <input type="email" name="email" defaultValue={profileData.email } />
                </label>
                <span>{state?.errors?.email}</span>
            </div>

                    <div>
                <label>
                    <span>
                        Password
                    </span>
                    <input type="password" name="password" defaultValue={profileData.password} />
                </label>
                <span>{state?.errors?.password}</span>
            </div>


                <div>
                <label>
                    <span>
                       Firstname
                    </span>
                    <input type="text" name="firstname" defaultValue={profileData.firstname} />
                </label>
                <span>{state?.errors?.firstname}</span>
            </div>

                <div>
                <label>
                    <span>
                        Lastname
                    </span>
                    <input type="text" name="lastname" defaultValue={profileData.lastname} />
                </label>
                <span>{state?.errors?.lastname}</span>
            </div>


            <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Updating profile"}
            </button>
        </form>
        </div>
    )
}