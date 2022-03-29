import styles from "./counter.module.scss";

interface CounterProps {
  count: number;
  handleClick: (count: number) => React.MouseEventHandler<HTMLButtonElement>;
  min: number;
  max: number;
  className?: string;
}

const Counter = ({ count, handleClick, min, max, className }: CounterProps) => {
  return (
    <div className={`${styles.counter} ${className}`}>
      <button
        className="btn-primary"
        disabled={count == min}
        onClick={handleClick(count - 1)}
      >
        -
      </button>
      <p>{count}</p>
      <button
        className="btn-primary"
        disabled={count == max}
        onClick={handleClick(count + 1)}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
