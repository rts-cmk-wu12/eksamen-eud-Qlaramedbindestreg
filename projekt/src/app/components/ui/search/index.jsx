import SearchProvider from "../../providers/search-provider/search-provider";
import CategoryList from "../category-list";
import SearchField from "@/components/ui/forms/search-field";

export default async function SearchFieldComponent() {
    //Kilde: fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/(routes)/search/search-two.jsx
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`);
	const listings = await response.json();

	return (
		<>
	
			<SearchProvider>
				<SearchField listings={listings} />
				<CategoryList listings={listings} />
			</SearchProvider>
		</>
	);
}