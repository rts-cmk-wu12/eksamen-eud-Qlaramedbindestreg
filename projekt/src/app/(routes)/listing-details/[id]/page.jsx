"use server";
import Image from "next/image";
import Link from "next/link";
import "./listing-details.scss";
import SwapButton from "@/app/components/ui/buttons/swap-button"; 
import { cookies } from "next/headers";


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

    const cookieStore = cookies();
    const token = cookieStore.get("sh_token")?.value;

    let otherListings = [];
    if (listing.userId) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings?userId/${listing.userId}&exclude=${id}`

        );
        if (res.ok) otherListings = await res.json();
    }

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
           {token && <SwapButton
           requestItemId={listing.id}
           myItemsId={1}
           userid={(await cookieStore).get("sh_userid")?.value}
           token={token}
           ></SwapButton>}
            </div>

        </div>

        {otherListings.length > 0 && (
            <div className="other__listings--slider">
                <h2>Other swap items from this user</h2>
                <div className="slider__wrapper">
                    {otherListings.map((item) => (
                        <Link key={item.id}
                        href={`/listing-details/${item.id}`}
                        className="slider__card"
                    >
                        <div className="slider__image--wrapper">
                          <Image
                                      src={listing.asset?.url || "/placeholder.jpg"}
                                      alt={listing.title}
                                      fill
                                      className="listing__image"
                                    ></Image>
                        </div>
                        <div className="slider__content">
                            <h3>{item.title}</h3>
                        </div>


                    </Link>
                       
                    ) )}
                </div>
            </div>
        )}
        </div>
        </>
    )
}