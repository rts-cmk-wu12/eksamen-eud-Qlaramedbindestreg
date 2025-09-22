"use client";

import { useActionState, useEffect } from "react";
import SearchAction from "./search-action";

export default function SearchForm() {
    //Kilde: Fra undervisning. 
    const [formState, formAction, pending] = useActionState(SearchAction);

    useEffect(function() {
     
    }, [formState])

    return (
        <>
        <form action={formAction}>
            <div>
                <label>
                    <span>
                        <input type="search" name="keyword" />
                    </span>
                </label>
            </div>
            <button type="submit">Søg</button>
        </form>
        {Array.isArray(formState)
        &&
        !formState.length && (
            <div>Ingen resultater</div>
        )}
        {formState?.map(listing => (
            <div key={listing.id}>{listing.title}</div>
        ))}
        </>

    );
}
