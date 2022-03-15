import Select from "./select";
import RadioGroup from "./radioGroup";

interface SortByProps {
  order: string;
  value: string;
  handleChangeOrder: React.ChangeEventHandler<HTMLInputElement>;
  handleChangeValue: React.ChangeEventHandler<HTMLSelectElement>;
}

const SortBy = ({
  order,
  value,
  handleChangeOrder,
  handleChangeValue,
}: SortByProps) => {
  const items = [{ name: "price" }, { name: "name" }];
  const buttons = [{ id: "ascending" }, { id: "descending" }];

  return (
    <>
      <Select
        label="Sort by"
        name="sortValue"
        items={items}
        valueProp="name"
        textProp="name"
        value={value}
        handleChange={handleChangeValue}
      />
      <RadioGroup
        className="order"
        buttons={buttons}
        name="sortOrder"
        selectedValue={order}
        handleChange={handleChangeOrder}
      />
    </>
  );
};

export default SortBy;
