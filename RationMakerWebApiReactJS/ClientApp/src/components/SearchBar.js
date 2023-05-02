import {FaSearch} from "react-icons/fa";
import "./SearchBar.css"
import {useState} from "react";
import ProductsFilter from "../ProductsFilter";

const SearchBar  = ({ setResults, products, currentCategory }) => {
    const [input, setInput] = useState([]);
    
    const fetchData = (value) => {
        ProductsFilter({setResults, currentCategory, products, value})
    }
    
    const handleChange = (value) => {
        setInput(value);
        fetchData(value)
    }
    
    return (
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input placeholder="Search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}

export default SearchBar;
