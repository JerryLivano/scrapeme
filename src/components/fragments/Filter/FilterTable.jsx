import React, { useState } from "react";

const FilterTable = ({ setSearchQuery }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-80 px-3 placeholder-gray-500 border rounded-md focus:outline-none sm:text-sm"
      />
    </div>
  );
};

export default FilterTable;