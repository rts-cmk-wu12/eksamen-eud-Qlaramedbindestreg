"use client";

import { useContext, useEffect, useState } from "react";
import SearchProvider, { searchContext} from "./components/providers/search-provider/search-provider";
import SearchField from "./components/forms/search-form/search-field";
import "./page.scss";
import { FiSearch } from "react-icons/fi"
import CategoryList from "./components/ui/category-list";


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

return (
    <SearchProvider>
      <SearchSection 
      listings={listings} 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage} 
      listingsPerPage={listingsPerPage} >
      </SearchSection>
    </SearchProvider>
  );
}

function SearchSection({ listings, currentPage, setCurrentPage, listingsPerPage }) {
  const { results } = useContext(searchContext);

const displayedList = results && results.length ? results : listings;

const pageCount = Math.ceil(displayedList.length / listingsPerPage);
const start = currentPage * listingsPerPage;
const currentListings = displayedList.slice(start, start + listingsPerPage);

  const handlePageClick = (pageIndex) => setCurrentPage(pageIndex);
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, pageCount - 1));

  return (
   
  
    <div className="home__container">
      <div className="filters__and__listings">
      
        <div className="filters__panel">
          <h3>Keywords</h3>

          <div className="filter__section">
           
            <label>
              <input type="checkbox" /> Label 
            </label>
            <label>
              <input type="checkbox" /> Label 
            </label>
            <label>
              <input type="checkbox" /> Label 
            </label>
          </div>

          <div className="filter__section">
            <p>Label</p>
            <input type="range" min="0" max="100" value="50" readOnly />
          </div>

            <div className="filter__section">
            <p>Color</p>
            <label>
              <input type="checkbox" /> Label 
            </label>
            <label>
              <input type="checkbox" /> Label 
            </label>
            <label>
              <input type="checkbox" /> Label 
            </label>
          </div>

              <div className="filter__section">
            <p>Size</p>
            <label>
              <input type="checkbox" /> Label 
            </label>
            <label>
              <input type="checkbox" /> Label 
            </label>
            <label>
              <input type="checkbox" /> Label 
            </label>
          </div>

        </div>

          
     
        <div className="main__content">
          <div className="search__wrapper">
            <SearchField listings={listings} />
            <FiSearch className="search__icon" />
          </div>

          <CategoryList listings={currentListings} />

          {pageCount > 1 && (
            <div className="pagination__wrapper">
              <button onClick={handlePrev} disabled={currentPage === 0}>
                ← Previous
              </button>

              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageClick(index)}
                  className={index === currentPage ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === pageCount - 1}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}