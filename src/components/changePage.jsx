import React from "react";

const ChangePage = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <div>
      {[...Array(pageCount)].map((e, i) => (
        <button
          autofocus={i + 1 === currentPage}
          onClick={() => {
            onPageChange(i + 1);
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default ChangePage;
