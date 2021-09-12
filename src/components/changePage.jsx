import React from "react";

const ChangePage = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <div>
      {pageCount > 1 && currentPage !== 1 && (
        <button
          onClick={() => {
            onPageChange(currentPage - 1);
          }}
        >
          &lt;
        </button>
      )}
      {pageCount > 1 &&
        [...Array(pageCount)].map((e, i) => (
          <button
            key={i}
            className={i + 1 === currentPage ? "selected" : undefined}
            onClick={() => {
              onPageChange(i + 1);
            }}
          >
            {i + 1}
          </button>
        ))}
      {pageCount > 1 && currentPage !== pageCount && (
        <button
          onClick={() => {
            onPageChange(currentPage + 1);
          }}
        >
          &gt;
        </button>
      )}
    </div>
  );
};

export default ChangePage;
