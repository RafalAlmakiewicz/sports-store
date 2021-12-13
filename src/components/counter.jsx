import React from "react";

const Counter = ({ count, set, min, max, id, className }) => {
  return (
    <div className={`counter ${className}`}>
      <button
        className="btn btn-neutral"
        disabled={count == min}
        onClick={() => set(count - 1, id)}
      >
        -
      </button>
      <p>{count}</p>
      <button
        className="btn btn-neutral"
        disabled={count == max}
        onClick={() => set(count + 1, id)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
