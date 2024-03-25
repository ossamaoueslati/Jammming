import React, { useState, useCallback } from "react";

import "./SearchBar.css";

const SearchBar = (props) => {
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    props.onSearch(term);
  }, [props.onSearch, term]);

  return (
    <div className="SearchBar">
      <input placeholder="What Song Is On Your Mind!" onChange={handleTermChange} />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
