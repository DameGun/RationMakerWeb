/*import {FaSearch} from "react-icons/fa";*/
// @ts-nocheck
import { useProductsDispatch } from "./DataContext";
import "./SearchBar.css";
import { useState } from "react";

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
      {/*<FaSearch id="search-icon"/>*/}
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
