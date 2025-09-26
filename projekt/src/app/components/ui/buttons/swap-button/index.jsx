//Kilder: https://react.dev/learn/conditional-rendering & https://react.dev/learn/responding-to-events & https://react.dev/learn/synchronizing-with-effects#fetching-data & https://react.dev/reference/react/useState & https://react.dev/learn/managing-state

"use client";
import "./swap-button.scss";
import { useState } from "react";
import { toast } from "react-toastify";


export default function SwapButton({ requestItemId, myItemId, userid, token }) {
    const  [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");

    async function proposeSwap() {
  setLoading(true);
  setStatus("");

  try {
    const res = await fetch("http://localhost:4000/api/v1/requests", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ userId: userid, requestItem: requestItemId, offerItem: myItemId }),
    });

    if (!res.ok) {
      let errorMessage = "Error suggesting swap";
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const errorData = await res.json();
        if (errorData?.message) errorMessage = errorData.message;
      } else {
        const text = await res.text();
        if (text) errorMessage = text;
      }

      throw new Error(errorMessage);
    }

    toast.success("Swap suggestion sent!");
    setStatus("Swap suggestion sent!");
  } catch (err) {
    toast.error(err.message);
    setStatus(err.message);
  } finally {
    setLoading(false);
  }
}

 
 return (
    <>
      <button
        className={`swap__button ${loading ? "loading" : ""}`}
        onClick={proposeSwap}
        disabled={loading}
      >
        {loading ? "Sending..." : "Suggest a swap"}
      </button>
    </>
  );
}