interface CounterProps {
  count: number;
  handleClick: (count: number) => React.MouseEventHandler<HTMLButtonElement>;
  min: number;
  max: number;
  className?: string;
}

const Counter = ({ count, handleClick, min, max, className }: CounterProps) => {
  return (
    <div className={`counter ${className}`}>
      <button
        className="btn btn-neutral"
        disabled={count == min}
        onClick={handleClick(count - 1)}
      >
        -
      </button>
      <p>{count}</p>
      <button
        className="btn btn-neutral"
        disabled={count == max}
        onClick={handleClick(count + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
