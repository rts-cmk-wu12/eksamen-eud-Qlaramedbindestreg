"use client";

import { useContext } from "react";
import CategoryCard from "../category-card";
import { searchContext } from "../../providers/search-provider/search-provider";


export default function CategoryList({ listings }) {

    // Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/activity-list/index.jsx
    const { results, errorMsg } = useContext(searchContext);
	
	const actualList = results.length ? results : listings;

	return (
        <>
        {errorMsg && <p>{errorMsg}</p>}
	   <div className="listing__grid">
      {listings.map(listing => (
        <CategoryCard key={listing.id} listing={listing} />
      ))}
    </div>
</>
	)
}