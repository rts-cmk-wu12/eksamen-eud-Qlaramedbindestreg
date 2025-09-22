"use client";

import { useContext } from "react";
import CategoryCard from "../category-card";
import { searchContext } from "../../providers/search-provider/search-provider";


export default function CategoryList({ listings }) {
    // Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/activity-list/index.jsx
    const { results, errorMsg } = useContext(searchContext);
	
	const actualList = listings || results || [];

	return (
        <>
        {errorMsg && <p>{errorMsg}</p>}
		<ul>
		{actualList.map(listing => (
			<li key={listing.id}>
				<CategoryCard listing={listing}></CategoryCard>
			</li>
		))}
        </ul>
</>
	)
}