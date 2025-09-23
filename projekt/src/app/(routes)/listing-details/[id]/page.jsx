"use client";
import Image from "next/image";
import "./listing-details.scss";

export default async function ListingDetails( {params} ) {
    //Kilder: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/(routes)/search/search-two.jsx
    //Dynamic routes https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
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
            width={600}
            height={400}
            ></Image>
            </div>

            <div className="details__content">
            <h1>{listing.title}</h1>
            <p>{listing.description}</p>
            </div>

        </div>
        </div>
        </>
    )
}