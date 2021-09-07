import React, { useState } from "react";

const SearchBox = ({ value, onSearch }) => {
  return (
    <input
      type="text"
      name="search"
      placeholder="Search..."
      value={value}
      onChange={(e) => {
        onSearch(e.currentTarget.value);
      }}
    />
  );
};

export default SearchBox;
