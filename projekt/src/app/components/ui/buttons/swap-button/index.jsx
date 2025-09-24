"use client";
import "./swap-button.scss";
import { useState } from "react";
import { toast } from "react-toastify";


export default function SwapButton({ requestItemId, myItemId, userid, token }) {
    const  [loading, setLoading] = useState(false);

    async function proposeSwap() {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/api/v1/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    userId: userid,
                    requestItem: requestItemId,
                    offerItem: myItemId,
                }),
            });
            if (!res.ok){
               const error = await res.json();
               throw new Error(error.message) || "Error suggesting swap"
            } 

            toast.success("Swap suggestion sent")
        }
        catch (err) {
            toast.error(err.message);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <button className="swap__button" onClick={proposeSwap} disabled={loading}>
            {loading ? "Sending..." : "Suggest a swap"}
        </button>
    )
}
