"use client";

import { createContext, useState } from "react";

export const searchContext = createContext(null);

export default function SearchProvider({ children }) {
    // Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/providers/search-provider/index.jsx
	const [results, setResults] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");


	return (
		<searchContext.Provider value={{ results, setResults, errorMsg, setErrorMsg }}>
			{children}
		</searchContext.Provider>
	);
}