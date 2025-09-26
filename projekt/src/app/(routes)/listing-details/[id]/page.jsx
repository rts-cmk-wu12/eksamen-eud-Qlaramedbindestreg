"use server";
import Image from "next/image";
import Link from "next/link";
import "./listing-details.scss";
import ListingDetailsClient from "./listingDetailsClient";
import { cookies } from "next/headers";

export default async function ListingDetailsPage( {params} ) {
   const { id } = params;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings/${id}`);
	if (!response.ok) {
        return <div>Listing ikke fundet</div>;
    }
    const listing = await response.json();

    const cookieStore = cookies();
    const token = cookieStore.get("sh_token")?.value;
    const userid = (await cookieStore).get("sh_userid")?.value;

    let otherListings = [];
    if (listing.userid) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings?userId=${listing.userId}&exclude=${id}`);

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
            className="details__image"
            ></Image>
            </div>
            <ListingDetailsClient 
            listing={listing} 
            token={token} 
            userid={userid} ></ListingDetailsClient>



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
                                      src={item.asset?.url || "/placeholder.jpg"}
                                      alt={item.title}
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
//Kilder: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/(routes)/search/search-two.jsx
//Dynamic routes https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes & fra undervisning /Users/qlara/Desktop/coding/next/next-repetition/src/app/(routes)/dashboard/update/[kageid]/page.jsx
//Dynamic API and params: https://nextjs.org/docs/messages/sync-dynamic-apis & https://nextjs.org/docs/app/api-reference/file-conventions/page
  