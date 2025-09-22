"use client";

import { searchContext } from "@/app/components/providers/search-provider/search-provider";
import { useContext } from "react";

export default function SearchField({ listings = [] }) {
	const { setResults, setErrorMsg } = useContext(searchContext);

	function searchHandler(event) {
		setErrorMsg("");
		const { value } = event.target;

		if (!value) {
            setResults(listings);
            return;
        }

		const filteredData = listings.filter(
            listing =>
                listing.title.toLowerCase().includes(value.toLowerCase()) ||
				listing.description.toLowerCase().includes(value.toLowerCase())
		
        );
        if (!filteredData.length) {
            setErrorMsg("Der er ingen resultater")
        }
    
		setResults(filteredData);
	}

	return (
		<div>
			<input 
            type="search"
            placeholder="Search"
            onChange={searchHandler} />
		</div>
	);
}