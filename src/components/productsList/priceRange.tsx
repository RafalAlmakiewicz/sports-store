import Input from "../reusable/input";

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
        name="min"
        type="number"
        value={minPrice}
        onChange={handleChangeMinPrice}
        placeholder="Min"
      />
      <Input
        name="max"
        type="number"
        value={maxPrice}
        onChange={handleChangeMaxPrice}
        placeholder="Max"
      />
    </div>
  );
};

export default PriceRange;
