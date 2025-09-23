"use server";
import Image from "next/image";
import "./listing-details.scss";


export default async function ListingDetailsPage( {params} ) {
    //Kilder: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/(routes)/search/search-two.jsx
    //Dynamic routes https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes & fra undervisning /Users/qlara/Desktop/coding/next/next-repetition/src/app/(routes)/dashboard/update/[kageid]/page.jsx
    //Dynamic API and params: https://nextjs.org/docs/messages/sync-dynamic-apis & https://nextjs.org/docs/app/api-reference/file-conventions/page
    const { id } = params;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings/${id}`);
	if (!response.ok) {
        return <div>Listing ikke fundet</div>;
    }
    const listing = await response.json();

    return (
        <>
        <div className="details__container">
            <div className="details__grid">
            
            <div className="details__image-wrapper">
            <Image
            src={listing.asset?.url || "/placeholder.jpg"}
            alt={listing.title || "Listing image"}
           fill
            ></Image>
            </div>

            <div className="details__content">
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            <button className="swap-button">Propose a swap</button>
            </div>

        </div>
        </div>
        </>
    )
}