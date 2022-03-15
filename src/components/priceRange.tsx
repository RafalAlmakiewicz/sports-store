import Input from "./Input";

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  handleChangeMinPrice: React.ChangeEventHandler<HTMLInputElement>;
  handleChangeMaxPrice: React.ChangeEventHandler<HTMLInputElement>;
}

const PriceRange = ({
  minPrice,
  maxPrice,
  handleChangeMinPrice,
  handleChangeMaxPrice,
}: PriceRangeProps) => {
  return (
    <div className="price-range">
      <Input
        label="min"
        type="number"
        value={minPrice}
        onChange={handleChangeMinPrice}
        placeholder="Min"
      />
      <Input
        label="max"
        type="text"
        value={maxPrice}
        onChange={handleChangeMaxPrice}
        placeholder="Max"
      />
    </div>
  );
};

export default PriceRange;
