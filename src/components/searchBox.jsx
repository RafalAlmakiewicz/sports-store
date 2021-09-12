import React, { useState } from "react";
import Input from "./Input";

const SearchBox = ({ value, onSearch }) => {
  return (
    <Input
      type="text"
      name="search"
      value={value}
      onChange={onSearch}
      placeholder="Search..."
    />
  );
};

export default SearchBox;
