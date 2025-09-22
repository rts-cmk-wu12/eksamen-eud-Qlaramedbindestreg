"use client";

import { useEffect, useState } from "react";
import SearchProvider from "./components/providers/search-provider/search-provider";
import SearchField from "./components/forms/search-form/search-field";
import "./page.scss";
import { FiSearch } from "react-icons/fi"
import ReactPaginate from "react-paginate";
import Image from "next/image";

export default function Home() {
 const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const listingsPerPage = 6;

 useEffect(() => { 
  async function fetchListings() {
    try {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/listings`);
  if (!response.ok) throw new Error("fetch fejl");
  const data = await response.json();
  setListings(data);
 } catch (error) {
  console.error("fetch fejl", error);
 }
}
 fetchListings();
 }, []);

  const offset = currentPage * listingsPerPage;
  const currentListings = listings.slice(offset, offset + listingsPerPage);
  const pageCount = Math.ceil(listings.length / listingsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
 
  return (

     // pagination kilde: https://github.com/AdeleD/react-paginate

    <div className="home__container">
   
        <SearchProvider>
          <div className="search__wrapper">
          <SearchField listings={listings}></SearchField>
          <FiSearch className="search__icon"></FiSearch>
          </div>
          <div className="listing__grid">
            {currentListings.map(listing => (
              <div key={listing.id} className="listing__card">
                <Image
                  src={listing.asset?.url || "/placeholder.jpg"}
                  alt={listing.title}
                  width={300}
                  height={200}
                  
                  className="listing__image"
                ></Image>
                <div className="listing__content">
                  <h2>{listing.title}</h2>
                </div>
              </div>
            ))}
          </div>
     
          <div className="pagination__wrapper">
            <ReactPaginate
                 previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            ></ReactPaginate>
          </div>
      </SearchProvider>
 
       
      
     
    </div>
  );
}
