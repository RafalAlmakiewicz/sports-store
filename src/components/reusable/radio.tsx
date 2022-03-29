import Input from "./input/input";

interface RadioProps {
  value?: string;
  selectedValue: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  name: string;
}

const Radio = ({
  value,
  selectedValue,
  handleChange,
  id,
  name,
}: RadioProps) => {
  return (
    <Input
      label={id}
      type="radio"
      id={id}
      name={name}
      value={value || id}
      onChange={handleChange}
      checked={(value || id) === selectedValue}
    />
  );
};

export default Radio;
