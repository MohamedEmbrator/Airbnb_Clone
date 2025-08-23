"use client";

import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import Header from "../components/header/Header";
import { SearchResultData } from "../types/app";
import { getSearchResult } from "../utils/api";
import ListingCard from "../components/ListingCard";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const numOfGuests = searchParams.get("numOfGuests") || "";

  let formatedStartDate = "";
  let formatedEndDate = "";
  if (startDate && endDate) {
    formatedStartDate = format(new Date(startDate), "dd MMMM yy");
    formatedEndDate = format(new Date(endDate), "dd MMMM yy");
  }
  const range = `${formatedStartDate} - ${formatedEndDate}`;
  const filters = [
    "Cancellation Flexibility",
    "Type of Place",
    "Price",
    "Rooms and Beds",
    "More filters",
  ];

  const [searchResultData, setSearchResultData] = useState<SearchResultData>(
    []
  );

  useEffect(() => {
    async function fetchSearchResult() {
      const getsearchResultData: SearchResultData = await getSearchResult();
      setSearchResultData(getsearchResultData);
    }
    fetchSearchResult();
  }, []);
  return (
    <>
      <Header placeholder={`${location} | ${range} | ${numOfGuests} guests`} />
      <main>
        <section>
          <div className="container flex">
            <div className="pt-14 pr-4">
              <p className="text-xs">
                300+ Stays - {range} - for {numOfGuests} guests
              </p>
              <h1 className="text-3xl font-semibold mt-2 mb-6 ">
                Stays in {location}
              </h1>
              <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                {filters.map((filter) => (
                  <button type="button" className="filter-btn" key={filter}>
                    {filter}
                  </button>
                ))}
              </div>
              <div>
                {searchResultData.map((listing) => (
                  <ListingCard
                    key={listing.title}
                    img={listing.img}
                    title={listing.title}
                    location={listing.location}
                    description={listing.description}
                    price={listing.price}
                    total={listing.total}
                    star={listing.star}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SearchResult;
