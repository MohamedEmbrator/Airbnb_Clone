"use client";

import Link from "next/link";
import { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
const Searchbar = ({ placeholder }: { placeholder?: string }) => {
  const [searchText, setSearchText] = useState<string>("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numOfGuests, setNumOfGuests] = useState<number>(1);
  const selectionRange = { startDate, endDate, key: "selection" };
  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate as Date);
    setEndDate(ranges.selection.startDate as Date);
  };
  return (
    <>
      <div className="flex items-center md:border-2 md:border-gray-300 rounded-full py-2 md:shadow-sm">
        <input
          value={searchText}
          type="text"
          placeholder={placeholder || 'Start your search'}
          onChange={(e) => setSearchText(e.target.value)}
          className="text-sm text-gray-600 placeholder-gray-400 flex-grow pl-5 bg-transparent outline-none"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {searchText && (
        <div className="absolute  top-[100%] left-[50%] flex flex-col col-span-3 mx-auto translate-x-[-50%] ">
          <DateRangePicker
            ranges={[selectionRange]}
            onChange={handleSelect}
            rangeColors={["#FD5B61"]}
            minDate={new Date()}
          />
          <div className="flex items-center border-b bg-white p-4">
            <h2 className="text-2xl flex-grow font-semibold">
              Number of Guests
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <input
              type="number"
              className="w-12 pl-2 text-lg outline-none text-red-400"
              value={numOfGuests}
              min={1}
              onChange={(e) => setNumOfGuests(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center bg-white p-5">
            <button
              type="button"
              className="flex-grow text-gray-500  cursor-pointer"
              onClick={() => setSearchText("")}
            >
              Cancel
            </button>
            <Link
              href={{
                pathname: "/search",
                search: `?location=${searchText}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&numOfGuests=${numOfGuests}`,
              }}
              onClick={() => setSearchText("")}
              className="flex-grow text-red-400  cursor-pointer"
            >
              Search
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
