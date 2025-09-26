 "use client";
 import SwapButton from "@/app/components/ui/buttons/swap-button";
 import { ToastContainer } from "react-toastify";

export default function ListingDetailsClient({ listing, token, userid }) {
  return (
    <div className="details__content">
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
      {token && (
        <SwapButton
          requestItemId={listing.id}
          myItemId={1}
          userid={userid}
          token={token}
        />
      )}
      <ToastContainer />
    </div>
  );
}
 // Kilde: https://nextjs.org/docs/app/api-reference/functions/use-router
