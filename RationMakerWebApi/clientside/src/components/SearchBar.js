import { FaSearch } from "react-icons/fa";
// @ts-nocheck
import { useProductsDispatch } from "../context/DataContext";
import "./SearchBar.css";
import { useState } from "react";
import React from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useProductsDispatch();

  function handleSearch(event) {
    event.preventDefault();
    setSearchTerm(event.target.value);
    dispatch({ type: "SEARCH_PRODUCTS", data: event.target.value });
  }

  return (
    <div className="input-wrapper">
      <FaSearch />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
