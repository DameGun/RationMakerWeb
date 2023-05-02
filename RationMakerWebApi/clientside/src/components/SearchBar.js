/*import {FaSearch} from "react-icons/fa";*/
import "./SearchBar.css"
import {useState} from "react";

const SearchBar  = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] =  useState('');
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    }
    
    return (
        <div className="input-wrapper">
            {/*<FaSearch id="search-icon"/>*/}
            <input 
                type="text"
                placeholder="Search..." 
                value={searchTerm} 
                onChange={handleSearchChange}/>
        </div>
    )
}

export default SearchBar;
