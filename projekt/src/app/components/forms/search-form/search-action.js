"use server";



export default async function SearchAction(prevState, formData) {

    const { keyword } = Object().fromEntries(formData);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`);

    if (!response.ok) {
        return {
            status: "fejl"
        };
    }

    const json = await response.json();

const filteredData = listings.filter(listing => 
		(
		listing.title.toLowerCase().includes(keyword.toLowerCase() ||
        listing.description.toLowerCase().includes(keyword.toLowerCase()))
        ) 
        
	);

	return filteredData;

}