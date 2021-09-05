import React from "react";

const Counter = ({ count, set, min, max, id }) => {
  return (
    <React.Fragment>
      <button disabled={count == min} onClick={() => set(count - 1, id)}>
        -
      </button>
      {count}
      <button disabled={count == max} onClick={() => set(count + 1, id)}>
        +
      </button>
    </React.Fragment>
  );
};

export default Counter;
