import { useContext, useState } from "react";
import searchContext from "../../context/search-context";

import "./SearchBar.css";

const SearchBar = () => {
  const { setSearchValue } = useContext(searchContext);
  const [inputValue, setInputValue] = useState("");

  const changeHandler = (event) => {
    setInputValue(event.target.value);
    setSearchValue(event.target.value);
  };
  return (
    <div className="searchbar">
      <input type="text" value={inputValue} onChange={changeHandler} />
      <button>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default SearchBar;
