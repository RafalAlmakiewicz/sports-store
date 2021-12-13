import React, { useState } from "react";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBox = ({ value, onSearch }) => {
  return (
    <div className="search-box">
      <Input
        type="text"
        name="search"
        value={value}
        onChange={onSearch}
        placeholder="Search..."
      />
      <FontAwesomeIcon icon="search" />
    </div>
  );
};

export default SearchBox;
