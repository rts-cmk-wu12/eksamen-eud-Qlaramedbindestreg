"use client";

import { useActionState, useEffect } from "react";
import SearchAction from "./search-action";

export default function SearchForm() {

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
//Kilde: Fra undervisning. /Users/qlara/Desktop/coding/next/search-field/src/app/components/ui/forms/search-form/search-form.jsx

